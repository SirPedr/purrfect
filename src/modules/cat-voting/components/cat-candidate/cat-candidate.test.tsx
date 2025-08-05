import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { Toaster } from "react-hot-toast";
import { server } from "../../../../tests/mocks/server";
import { CatCandidate } from "./cat-candidate";

describe("CatCandidate", () => {
  const defaultProps = {
    catId: "test-cat-1",
    src: "https://example.com/cat.jpg",
    alt: "Test Cat",
    width: 500,
    height: 400,
  };

  const renderWithClient = (ui: React.ReactElement) => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false, gcTime: 0 },
        mutations: { retry: false, gcTime: 0 },
      },
    });

    return render(
      <QueryClientProvider client={queryClient}>
        {ui}
        <Toaster />
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all voting controls", () => {
    renderWithClient(<CatCandidate {...defaultProps} />);

    expect(screen.getByRole("img", { name: "Test Cat" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Dislike" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Like" })).toBeInTheDocument();
  });

  it("shows success message when clicking 'like'", async () => {
    const user = userEvent.setup();

    renderWithClient(<CatCandidate {...defaultProps} />);

    const likeButton = screen.getByRole("button", { name: "Like" });
    await user.click(likeButton);

    await waitFor(() => {
      expect(screen.getByText(/you liked this cat/i)).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Like" })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Dislike" })
      ).not.toBeInTheDocument();
    });
  });

  it("shows success message when clicking 'dislike'", async () => {
    const user = userEvent.setup();

    renderWithClient(<CatCandidate {...defaultProps} />);

    const dislikeButton = screen.getByRole("button", { name: "Dislike" });
    await user.click(dislikeButton);

    await waitFor(() => {
      expect(screen.getByText(/you didn't like this cat/i)).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Like" })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Dislike" })
      ).not.toBeInTheDocument();
    });
  });

  it("shows voting options again and error toast when vote fails", async () => {
    const user = userEvent.setup();

    server.use(
      http.post("https://api.thecatapi.com/v1/votes", async () => {
        return HttpResponse.json(
          { message: "Failed to save vote" },
          { status: 500 }
        );
      })
    );

    renderWithClient(<CatCandidate {...defaultProps} />);

    const likeButton = screen.getByRole("button", { name: "Like" });
    await user.click(likeButton);

    await waitFor(() => {
      expect(screen.getByText(/failed to save your vote/i)).toBeInTheDocument();
    });

    expect(screen.getByRole("button", { name: "Like" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Dislike" })).toBeInTheDocument();
  });

  it("handles optimistic updates correctly", async () => {
    const user = userEvent.setup();

    renderWithClient(<CatCandidate {...defaultProps} />);

    const likeButton = screen.getByRole("button", { name: "Like" });
    await user.click(likeButton);

    expect(screen.getByText(/you liked this cat/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/you liked this cat/i)).toBeInTheDocument();
    });
  });
});
