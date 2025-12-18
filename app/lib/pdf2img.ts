import "@ungap/with-resolvers";

export interface PdfConversionResult {
  imageUrl: string;
  file: File | null;
  error?: string;
}

export async function convertPdfToImage(file: File): Promise<PdfConversionResult> {
  // 1. Guard against Server-Side Rendering (SSR)
  if (typeof window === "undefined") {
    return { imageUrl: "", file: null };
  }

  try {
    /** * 2. Dynamic Imports
     * We import these inside the function so the server never touches 
     * the browser-only code inside pdfjs-dist.
     */
    const pdfjsLib = await import("pdfjs-dist");
    
    // Vite-specific: get the worker URL dynamically
    // @ts-ignore
    const workerModule = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
    pdfjsLib.GlobalWorkerOptions.workerSrc = workerModule.default;

    // 3. Process the PDF
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      useSystemFonts: true,
      disableFontFace: false,
    });

    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);

    // 4. Setup Canvas (Browser-only API)
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) throw new Error("Could not create canvas context");

    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);

    // Fill background
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // 5. Render Task
    const renderContext: any = {
      canvasContext: context,
      viewport: viewport,
      intent: 'display',
    };

    await page.render(renderContext).promise;

    // 6. Return Result
    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const cleanName = file.name.replace(/\.[^/.]+$/, "");
            const imageFile = new File([blob], `${cleanName}.png`, { type: "image/png" });
            
            resolve({
              imageUrl: URL.createObjectURL(blob),
              file: imageFile,
            });
          } else {
            resolve({ imageUrl: "", file: null, error: "Blob creation failed" });
          }
        },
        "image/png"
      );
    });

  } catch (err: any) {
    console.error("PDF Conversion Error:", err);
    return {
      imageUrl: "",
      file: null,
      error: err.message || "Failed to convert PDF",
    };
  }
}