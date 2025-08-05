import { http, HttpResponse } from "msw";
import { mockCatImages } from "./mock-data";

export const handlers = [
  http.get("https://api.thecatapi.com/v1/images/search", ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page");
    
    if (page === "error") {
      return HttpResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }

    const pageNum = parseInt(page || "0");
    const startIdx = pageNum * 10;
    const endIdx = startIdx + 10;
    
    return HttpResponse.json(
      mockCatImages.slice(startIdx, endIdx)
    );
  }),

  http.post("https://api.thecatapi.com/v1/votes", async ({ request }) => {
    const body = await request.json() as any;
    
    if (body.image_id === "fail-vote") {
      return HttpResponse.json(
        { message: "Failed to save vote" },
        { status: 500 }
      );
    }

    return HttpResponse.json({
      id: Math.floor(Math.random() * 10000),
      message: "SUCCESS",
      image_id: body.image_id,
      sub_id: body.sub_id,
      value: body.value,
      country_code: "US"
    });
  }),
];