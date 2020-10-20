## Guidelines to submit the blog in Engineering Portal

Here are some guidelines that you must follow while writing the blog for the engineering portal:

1. First of all create a directory in `blog` under `content` directory The name of the directory will be the path of your blog.
2. Add an `index.md` file and write your blog in it. Any relevant images used in the blog should be placed in the same directory as `index.md`.
3. Write the post in Markdown format, it's easy, fast, multi-platform and you can edit it in any editor like vscode has `HTML` preview. You can also use online tools like [Dillinger](https://dillinger.io/), where you find the sample content to understand the syntax of markdown.
4. You can also refer this [Markdown Guide](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

5. The blog should have the cover image with the aspect ratio of **3:2**, we recommend using image size of **1200px X 800px** and the minimum image size can be **900px X 600px**.

6. The blog should have the meta tags at the top of your MD files which should have the below properties.

   - **title (Required)** : A meaningful title.
     Note: This title will appear in the post so no need to again include it in the `md` files.
   - **date (Required)**: A date should be in `YYYY-MM-DD` format. And the date should not be greater than the current date.
   - **coverImage (Required)**: The name of the image with format should come here. Please make sure the image should be present in the directory where your `.md` the file is there.
   - **author (Required)**: The name of the author, make sure the author name should match with the one you have added in you Pull Request description.
   - **tags: (optional)** : You can add the relevant the in the Array of string `for eg: ["NodeJs"]`. Please make sure tags should not be more than three.
   - **description** (optional): You can add the short description, which will appear in the card of your blog, it should not be more than 160 characters. If you don't specify the description by default the first 160 characters of your blog will be shown.

   This is an example of the meta info in your blog

   ```
   ---
   title: Hello this is a title
   date: "2020-06-11"
   coverImage: "coverImage.png"
   author: "Jon Doe"
   description: "This is for test"
   ---

   Your blog will start here...

   ```

7. As discussed above while submitting the pull request you need to mention the **author details** in the pull request description. The format should be as below.

   - **id (required)**: The name of the author, it should be the same as the name in the meta tags of the blog.
   - **bio (optional)**: A short intro about you.
   - **social profiles (optional)**: You need to mention the id of your social profiles, supported social profiles will be GitHub, StackOverflow, LinkedIn, medium, twitter.
     Note: For StackOverflow, you need to add your id which is in **number**, for eg: `https://stackoverflow.com/users/5688477/modi-mohammed` for this URL id will be `5688477`.

   This is an example of the author info

   ```
   id: Jon Doe
   bio: A short intro about me
   github:
   stackoverflow:
   linkedin:
   medium:
   twitter:
   ```

8. We strongly **Discourage Plagiarism** and hence check all the blog pull requests for plagiarism using a plagiarism checker. Please make sure your content is not copy-pasted from anywhere else.

## Some tips that you can keep in mind while writing the blog.

- Keep post's language simple and easy to understand, we are making our blogs for the mass and our audience doesn't need to be only native English speakers

- Use short paragraphs, break down longer paragraphs into smaller one, people lose their interest more while reading a long paragraph

- Use headers to structure your post, use large headers for the main heading and smaller for sub-sections in it

- Try to use complete words then abbreviations, spell out an acronym that isn’t well-known

- If your code contains a code snippet, don't forget to syntax highlighting it, You can also specify the programming language for which you want syntax highlighting.
  **For example:** in markdown typing, ```js will give you JavaScript syntax highlighting.

- Try to use images/screenshots in your post to example things better, images are also visible when you share the post in social media

- Always provide a GitHub demo link whenever you post contains the code.

- Simplicity, Ease of Implementation of the content, developer-friendly and effectiveness
