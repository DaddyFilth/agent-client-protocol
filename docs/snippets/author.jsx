/**
 * Author byline for announcement and update posts.
 *
 * Renders a top border followed by a bold name (optionally linked to the
 * author's GitHub profile) and an optional role line beneath it.
 *
 * Usage:
 *
 *   import { Author } from "/snippets/author.jsx";
 *
 *   <Author
 *     name="Ben Brandt"
 *     role="Zed Industries / ACP Lead Maintainer"
 *     github="https://github.com/benbrandt"
 *   />
 */
/**
 * Renders a user profile section with name, optional role, and optional GitHub link.
 * Displays the name as a hyperlink if a GitHub URL is provided.
 * Applies styling for light and dark modes.
 * 
 * @param {Object} props - User information.
 * @param {string} props.name - The user's name.
 * @param {string} [props.role] - The user's role or title (optional).
 * @param {string} [props.github] - URL to the user's GitHub profile (optional).
 * @returns {JSX.Element} A styled React component displaying the user info.
 * @throws {TypeError} If required props.name is missing or not a string.
 */
/**
 * Renders a profile section with name, optional role, and optional GitHub link.
 * Name is a hyperlink if GitHub URL is provided; supports light/dark mode styling.
 * 
 * @param {Object} props - User information.
 * @param {string} props.name - The user's name.
 * @param {string} [props.role] - Optional user role.
 * @param {string} [props.github] - Optional GitHub profile URL.
 * @returns {JSX.Element} The rendered profile section component.
 * @throws {TypeError} If required props.name is missing or not a string.
 */
export const Author = ({ name, role, github }) => (
  <div className="mt-8 border-t border-gray-200 pt-4 dark:border-gray-800">
    <div className="font-semibold">
      {github ? <a href={github}>{name}</a> : name}
    </div>
    {role ? <div className="mt-1 text-sm opacity-80">{role}</div> : null}
  </div>
);
