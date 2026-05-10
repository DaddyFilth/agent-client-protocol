import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Author } from '../author';


describe('Author() Author method', () => {
  describe("Happy paths", () => {
    test("renders author name as plain text when github prop is not provided", () => {
      render(
        <Author
          name="Ben Brandt"
          role="Zed Industries / ACP Lead Maintainer"
        />
      );
      const nameElement = screen.getByText("Ben Brandt");
      expect(nameElement).toBeInTheDocument();
      expect(nameElement.tagName).not.toBe("A");
    });

    test("renders author name as a link when github prop is provided", () => {
      render(
        <Author
          name="Ben Brandt"
          role="Zed Industries / ACP Lead Maintainer"
          github="https://github.com/benbrandt"
        />
      );
      const linkElement = screen.getByRole("link", { name: "Ben Brandt" });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", "https://github.com/benbrandt");
    });

    test("renders the role when role prop is provided", () => {
      render(
        <Author
          name="Ben Brandt"
          role="Zed Industries / ACP Lead Maintainer"
        />
      );
      const roleElement = screen.getByText("Zed Industries / ACP Lead Maintainer");
      expect(roleElement).toBeInTheDocument();
      expect(roleElement).toHaveClass("mt-1", "text-sm", "opacity-80");
    });

    test("renders both name as link and role when both github and role are provided", () => {
      render(
        <Author
          name="Ben Brandt"
          role="Zed Industries / ACP Lead Maintainer"
          github="https://github.com/benbrandt"
        />
      );
      const linkElement = screen.getByRole("link", { name: "Ben Brandt" });
      const roleElement = screen.getByText("Zed Industries / ACP Lead Maintainer");
      expect(linkElement).toBeInTheDocument();
      expect(roleElement).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    test("renders nothing for role when role prop is undefined", () => {
      render(
        <Author
          name="Ben Brandt"
        />
      );
      const roleElement = screen.queryByText("Zed Industries / ACP Lead Maintainer");
      expect(roleElement).not.toBeInTheDocument();
      expect(screen.queryByText((content, element) => {
        return element.className.includes("text-sm");
      })).not.toBeInTheDocument();
    });

    test("renders nothing for role when role prop is an empty string", () => {
      render(
        <Author
          name="Ben Brandt"
          role=""
        />
      );
      expect(screen.queryByText((content, element) => {
        return element.className.includes("text-sm");
      })).not.toBeInTheDocument();
    });

    test("renders nothing for name when name prop is an empty string", () => {
      render(
        <Author
          name=""
          role="Zed Industries / ACP Lead Maintainer"
        />
      );
      expect(screen.queryByText("")).not.toBeNull();
      expect(screen.getByText("Zed Industries / ACP Lead Maintainer")).toBeInTheDocument();
    });

    test("renders name as link even if github is an empty string", () => {
      render(
        <Author
          name="Ben Brandt"
          role="Zed Industries / ACP Lead Maintainer"
          github=""
        />
      );
      const linkElement = screen.getByRole("link", { name: "Ben Brandt" });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", "");
    });

    test("renders correctly when all props are undefined", () => {
      render(<Author />);
      const nameDiv = screen.getByText((content, element) => {
        return element.className.includes("font-semibold");
      });
      expect(nameDiv).toBeInTheDocument();
      expect(nameDiv).toBeEmptyDOMElement();
      expect(screen.queryByText((content, element) => {
        return element.className.includes("text-sm");
      })).not.toBeInTheDocument();
    });

    test("renders correctly when name is a number", () => {
      render(
        <Author
          name={123}
          role="Zed Industries / ACP Lead Maintainer"
        />
      );
      expect(screen.getByText("123")).toBeInTheDocument();
    });

    test("renders correctly when role is a number", () => {
      render(
        <Author
          name="Ben Brandt"
          role={456}
        />
      );
      expect(screen.getByText("456")).toBeInTheDocument();
    });

    test("renders correctly when github is a non-url string", () => {
      render(
        <Author
          name="Ben Brandt"
          github="not-a-url"
        />
      );
      const linkElement = screen.getByRole("link", { name: "Ben Brandt" });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", "not-a-url");
    });
  });
});