import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { beforeEach } from "vitest";

describe("<Blog />", () => {
  let container;
  let likeBlog;

  beforeEach(() => {
    const blog = {
      title: "A Test Blog",
      author: "Dummy Author",
      url: "blog.com",
      likes: 5,
      user: { name: "User", username: "user" },
    };

    likeBlog = vi.fn();

    container = render(<Blog blog={blog} likeBlog={likeBlog} />).container;
  });

  test("title and author are shown by default, but url and likes are not", () => {
    const infoBlock = container.querySelector(".info");
    expect(infoBlock).not.toHaveStyle("display: none");

    const hiddenBlock = container.querySelector(".more-info");
    expect(hiddenBlock).toHaveStyle("display: none");
  });

  test("url and likes are shown when button is clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show");
    await user.click(button);

    const hiddenBlock = container.querySelector(".more-info");
    expect(hiddenBlock).not.toHaveStyle("display: none");
  });

  test("after clicking like twice, the handler is called two times", async () => {
    const user = userEvent.setup();
    const likeButton = screen.getByText("like");

    await user.click(likeButton);
    await user.click(likeButton);

    expect(likeBlog.mock.calls).toHaveLength(2);
  });
});
