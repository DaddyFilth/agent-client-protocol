import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Author } from '../author';


describe('Author() Author method', () => {
  describe("Happy paths", () => {
    test("renders author name in bold and role when all props are provided", () => {
      render(
        <Author
          name="Ben Brandt"
          role="Zed Industries / ACP Lead Maintainer"
          github="https://github.com/benbrandt"
        />
      );
      const nameLink = screen.getByRole("link", { name: "Ben Brandt" });
      expect(nameLink).toBeInTheDocument();
      expect(nameLink).toHaveAttribute("href", "https://github.com/benbrandt");
      expect(nameLink).toHaveTextContent("Ben Brandt");

      const role = screen.getByText("Zed Industries / ACP Lead Maintainer");
      expect(role).toBeInTheDocument();
      expect(role).toHaveClass("mt-1", { exact: false });
      expect(role).toHaveClass("text-sm", { exact: false });
      expect(role).toHaveClass("opacity-80", { exact: false });
    });

    test("renders author name as plain text when github prop is not provided", () => {
      render(
        <Author
          name="Jane Doe"
          role="Documentation Lead"
        />
      );
      const name = screen.getByText("Jane Doe");
      expect(name).toBeInTheDocument();
      expect(name.tagName.toLowerCase()).toBe("div");
      expect(screen.queryByRole("link", { name: "Jane Doe" })).not.toBeInTheDocument();

      const role = screen.getByText("Documentation Lead");
      expect(role).toBeInTheDocument();
    });

    test("renders only author name as a link when role is not provided", () => {
      render(
        <Author
          name="Alex Smith"
          github="https://github.com/alexsmith"
        />
      );
      const nameLink = screen.getByRole("link", { name: "Alex Smith" });
      expect(nameLink).toBeInTheDocument();
      expect(nameLink).toHaveAttribute("href", "https://github.com/alexsmith");
      expect(screen.queryByText("Alex Smith", { selector: "div" })).not.toBeInTheDocument();

      expect(screen.queryByText((_, el) => el.className.includes("text-sm"))).not.toBeInTheDocument();
    });

    test("renders only author name as plain text when only name is provided", () => {
      render(
        <Author
          name="Chris Lee"
        />
      );
      const name = screen.getByText("Chris Lee");
      expect(name).toBeInTheDocument();
      expect(name.tagName.toLowerCase()).toBe("div");
      expect(screen.queryByRole("link", { name: "Chris Lee" })).not.toBeInTheDocument();

      expect(screen.queryByText((_, el) => el.className.includes("text-sm"))).not.toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    test("renders nothing for role if role is an empty string", () => {
      render(
        <Author
          name="Dana Scully"
          role=""
          github="https://github.com/danascully"
        />
      );
      const nameLink = screen.getByRole("link", { name: "Dana Scully" });
      expect(nameLink).toBeInTheDocument();
      expect(screen.queryByText((_, el) => el.className.includes("text-sm"))).not.toBeInTheDocument();
    });

    test("renders nothing for name if name is an empty string", () => {
      render(
        <Author
          name=""
          role="Ghost Writer"
          github="https://github.com/ghost"
        />
      );
      const nameLink = screen.getByRole("link");
      expect(nameLink).toBeInTheDocument();
      expect(nameLink).toHaveTextContent("");
      const role = screen.getByText("Ghost Writer");
      expect(role).toBeInTheDocument();
    });

    test("renders nothing for name if name is undefined", () => {
      render(
        <Author
          role="No Name"
          github="https://github.com/noname"
        />
      );
      const nameLink = screen.getByRole("link");
      expect(nameLink).toBeInTheDocument();
      expect(nameLink).toHaveTextContent("");
      const role = screen.getByText("No Name");
      expect(role).toBeInTheDocument();
    });

    test("renders nothing for name if name is null", () => {
      render(
        <Author
          name={null}
          role="Null Name"
          github="https://github.com/null"
        />
      );
      const nameLink = screen.getByRole("link");
      expect(nameLink).toBeInTheDocument();
      expect(nameLink).toHaveTextContent("");
      const role = screen.getByText("Null Name");
      expect(role).toBeInTheDocument();
    });

    test("renders nothing for role if role is undefined", () => {
      render(
        <Author
          name="Undefined Role"
          github="https://github.com/undefinedrole"
        />
      );
      const nameLink = screen.getByRole("link", { name: "Undefined Role" });
      expect(nameLink).toBeInTheDocument();
      expect(screen.queryByText((_, el) => el.className.includes("text-sm"))).not.toBeInTheDocument();
    });

    test("renders nothing for role if role is null", () => {
      render(
        <Author
          name="Null Role"
          role={null}
          github="https://github.com/nullrole"
        />
      );
      const nameLink = screen.getByRole("link", { name: "Null Role" });
      expect(nameLink).toBeInTheDocument();
      expect(screen.queryByText((_, el) => el.className.includes("text-sm"))).not.toBeInTheDocument();
    });

    test("renders with unusual github URL", () => {
      render(
        <Author
          name="Odd URL"
          github="ftp://github.com/odd"
        />
      );
      const nameLink = screen.getByRole("link", { name: "Odd URL" });
      expect(nameLink).toBeInTheDocument();
      expect(nameLink).toHaveAttribute("href", "ftp://github.com/odd");
    });

    test("renders with special characters in name and role", () => {
      render(
        <Author
          name="Ånna Müller & Co."
          role="Développeur Sénior – R&D"
          github="https://github.com/anna"
        />
      );
      const nameLink = screen.getByRole("link", { name: "Ånna Müller & Co." });
      expect(nameLink).toBeInTheDocument();
      expect(nameLink).toHaveTextContent("Ånna Müller & Co.");
      const role = screen.getByText("Développeur Sénior – R&D");
      expect(role).toBeInTheDocument();
    });
  });
});