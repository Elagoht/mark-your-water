import Watermark from "@/utilities/Watermark";

export const GET = async (request) => {
  try {
    const { searchParams } = request.nextUrl;

    const source = searchParams.get("source");
    const text = searchParams.get("text");

    if (!source) return new Response("Missing source", { status: 400 });

    if (!text) return new Response("Missing text", { status: 400 });

    const imageResponse = await Watermark.generateImageResponse(source, text);
    return imageResponse;
  } catch (error) {
    return new Response(
      error instanceof Error ? error.message : "Unknown error",
      { status: 500 }
    );
  }
};
