# Morphix

Morphix is a web-based tool that converts Microsoft Word (`.docx`)
course content into structured content and HTML for use in D2L
Brightspace. It helps reduce the manual work involved in reformatting
course materials by turning a Word document into editable content with
an HTML preview.

## What Morphix Does

-   **Converts DOCX content:** Processes a Word document and identifies
    its structural elements.
-   **Organizes content:** Maps the document into structured sections,
    headings, and content blocks.
-   **Supports editing:** Lets users review and edit the structured
    content.
-   **Previews generated HTML:** Shows how the content will look as HTML
    before it is used in D2L Brightspace.

## Currently Supported Content

Morphix currently supports the following content types:

-   **Headings:** Topic titles (h1) and sub-headings (h2 through h6).
-   **Paragraphs:** Regular paragraph text.
-   **Lists:** Ordered (numbered) and unordered (bulleted) lists.
-   **Links:** Hyperlinks are detected and converted into HTML anchor (`<a>`) tags, with a small exception described below.

**Links in paragrpahs and list items**
When Morphix detects a link inside a paragraph, it wraps the link in an HTML `<a>` tag. However, because the parser processes the existing document content, the original link text may remain in the paragraph alongside the generated anchor tag. This can cause the link text to appear twice in the generated HTML.

For example
```html
    <p>
        This foundational module covers building modern components. MORPHIX
        <a href="https://morphix.kushalpatel.me">MORPHIX</a>
    </p>
```

## How to Use Morphix

### 1. Prepare Your Word Document

Before uploading a `.docx` file, make sure it follows the formatting
rules in the **DOCX Formatting Blueprint** below. Morphix relies on
these visual and structural markers to interpret the document correctly.

### 2. Upload and Review the Content

Upload your prepared Word document to Morphix. Review the parsed content
to make sure sections, topic titles, sub-headings, and lists have been
identified as intended.

### 3. Edit the Structured Content

Use the editor to make any necessary changes to the parsed content.
Check headings and content blocks carefully, especially if the original
document uses inconsistent formatting.

### 4. Check the HTML Preview

Review the generated HTML preview to confirm that the content is
organized and displayed as expected. If something looks incorrect,
return to the structured content and adjust it.

### 5. Use the Generated HTML

Once the content looks correct, use the website's available output or
export option to obtain the generated HTML for your D2L Brightspace
course. Check the final result in Brightspace after adding it to your
course.

------------------------------------------------------------------------

# The DOCX Formatting Blueprint

Morphix's parsing engine relies on visual structural markers inside your
Microsoft Word document to identify and organize content. Before
uploading, ensure your `.docx` file follows these four baseline layout
rules.

![DOCX Formatting rules](/public/images/morphix-rules.jpeg)

## 1. Section Splits

To split your document into separate course sections, type the exact
text string **`PAGE BREAK`** on its own line (Case does not matter).

The parser detects this marker, ends the current section or starts a new section (depending on where you are writing it). Make sure `PAGE BREAK` is isolated on its own line.

Therefore, start your `.docx` file with a literal `PAGE BREAK` or `page break` before any of the headings.

## 2. Topic Headers

The first line of text immediately after a section split (PAGE BREAK), is treated as the main
**`topicTitle (h1)`** for that section. Make sure to give it semantic heading style.

Or you can make it `All Bold` for the parser to take it as a topic title (h1).

This title acts as the structural anchor for the content that follows.
Make sure the first line in each section is the intended topic title.

## 3. Semantic Sub-Headings

Use Microsoft Word's built-in heading styles, from **Heading 2 (`h2`)
through Heading 6 (`h6`)**, for sub-headings.

If the document does not use heading styles, you can instead make the
entire paragraph line **bold**. Morphix detects this formatting and
falls back to a standard level-two heading (`h2`).

For the most reliable results, use Word's built-in heading styles
consistently whenever possible.

## 4. Aggregated Bullet Lists

Group related list items together using standard Word bullet points or
numbered lists.

Morphix combines sequential list items into a single structured node
containing an indexed text array, rather than treating each list item as
a separate paragraph. Keep related items together and use Word's
standard list formatting.

------------------------------------------------------------------------

## Tips for Best Results

-   Use the exact `PAGE BREAK` marker, in uppercase or lowercase, on a line by
    itself before any of the topic heading..
-   Put the intended topic title first in each section.
-   Apply Word heading styles consistently to sub-headings.
-   Use standard Word bullets or numbered lists for grouped items.
-   Review the parsed structure and HTML preview before using the output
    in D2L Brightspace.

## Important Note

The quality of the generated structure depends on the formatting of the
source Word document. If the document does not follow these rules,
Morphix may not identify its sections or content blocks as intended.
Always review the parsed content and generated HTML before using it in a
course.
