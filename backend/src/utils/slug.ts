export const createSlug = (input: string) => {
  // 1. Convert to lowercase
  // 2. Trim leading/trailing whitespace
  // 3. Replace non-alphanumeric characters (excluding hyphens and spaces) with a hyphen.
  //    The `\s` matches whitespace characters.
  // 4. Replace multiple consecutive hyphens with a single hyphen.
  // 5. Remove hyphens from the start and end of the string.

  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove all non-alphanumeric chars (except space and hyphen)
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Collapse multiple hyphens into one
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};
