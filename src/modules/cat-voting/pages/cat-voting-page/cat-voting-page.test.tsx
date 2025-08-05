import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { server } from "../../../../tests/mocks/server";
import { createTestWrapper } from "../../../../tests/test-wrapper";
import { CatVotingPage } from "./cat-voting-page";

const TestWrapper = createTestWrapper();

describe("CatVotingPage", () => {
  it("renders loading spinner initially", () => {
    render(
      <TestWrapper>
        <CatVotingPage />
      </TestWrapper>
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders image gallery with all returned images", async () => {
    render(
      <TestWrapper>
        <CatVotingPage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });

    const catImages = await screen.findAllByRole("img");
    expect(catImages).toHaveLength(10);

    catImages.forEach((img, index) => {
      expect(img).toHaveAttribute("alt", `Cat #${index + 1}`);
      expect(img).toHaveAttribute(
        "src",
        expect.stringContaining(`cat-${index + 1}.jpg`)
      );
    });
  });

  it("clicking on 'fetch more' loads new images", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <CatVotingPage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });

    const initialImages = await screen.findAllByRole("img");
    expect(initialImages).toHaveLength(10);

    const fetchMoreButton = screen.getByRole("button", {
      name: /fetch more cats/i,
    });
    await user.click(fetchMoreButton);

    await waitFor(() => {
      const allImages = screen.getAllByRole("img");
      expect(allImages).toHaveLength(20);
    });

    const newImages = screen.getAllByRole("img");
    expect(newImages[10]).toHaveAttribute(
      "src",
      expect.stringContaining("cat-11.jpg")
    );
    expect(newImages[19]).toHaveAttribute(
      "src",
      expect.stringContaining("cat-20.jpg")
    );
  });

  it("shows error message when fetch more fails", async () => {
    const user = userEvent.setup();

    server.use(
      http.get("https://api.thecatapi.com/v1/images/search", ({ request }) => {
        const url = new URL(request.url);
        const page = url.searchParams.get("page");

        if (page === "1") {
          return HttpResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
          );
        }

        return HttpResponse.json(
          Array.from({ length: 10 }, (_, i) => ({
            id: `cat-${i + 1}`,
            url: `https://cdn2.thecatapi.com/images/cat-${i + 1}.jpg`,
            width: 500,
            height: 400,
            breeds: [],
          }))
        );
      })
    );

    render(
      <TestWrapper>
        <CatVotingPage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });

    const fetchMoreButton = screen.getByRole("button", {
      name: /fetch more cats/i,
    });
    await user.click(fetchMoreButton);

    await waitFor(() => {
      expect(
        screen.getByText(/failed to load cat images/i)
      ).toBeInTheDocument();
    });
  });
});
