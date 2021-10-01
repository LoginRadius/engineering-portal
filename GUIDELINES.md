## Guidelines to submit a blog post

Here are the guidelines that you shall follow for writing a blog post for Async Blog:

1. First of all, create a directory in `guest-post` under `content` directory. The name of the directory will be the slug of your blog post. Please only use lowercase letters and separate words using hyphens. For example, `this-is-my-blog-post-title`
2. Add an `index.md` file and write your blog in it. Place any relevant images used in the blog in the same directory as `index.md`.
3. Write the post in Markdown format -- it's easy, fast, and multi-platform. And you can edit it in any editor, like VS Code, which has `HTML` preview. You can also use online tools like [Dillinger](https://dillinger.io/), where you find the sample content to understand the syntax of Markdown.
4. You can also refer to this [Markdown Guide](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
5. The blog should have the cover image with size **1200px x 800px**.
6. The blog should have the meta tags at the top of your `.md` file, which should have the below properties.

   - **title:** A meaningful title. Max. 60 characters.
     Note: This title will appear in the post, so no need to again include it in the `.md` file.
   - **date:** A date should be in `YYYY-MM-DD` format. And the date should not be greater than the current date.
   - **coverImage:** The name of the image with format should come here. For example, `coverimage.png`. Please make sure that the image is present in the same directory as your `.md`.
   - **author:** The name of the author, make sure the author name should match with what you would add in your Pull Request description.
   - **tags:** Add up to 3 relevant tags as an array of string `for eg: ["NodeJs"]`.
   - **description:** Add a short description about your blog post, which will appear in the card of your blog. It should not be more than 160 characters. 

   This is an example of the meta info in your blog:

   ```
   ---
   title: Hello this is a title
   date: "2020-06-11"
   coverImage: "coverImage.png"
   author: "Jon Doe"
   tags: ["Example1", "Example2","Example3"]
   description: "This is for test"
   ---

   Your blog will start here...

   ```

7. As discussed above, while submitting the pull request, you need to mention the **author details** in the pull request description. The format should be as below.

   - **id (required)**: The name of the author, it should be the same as the name in the meta tags of the blog.
   - **bio (optional)**: A short, meaningful intro about you.
   - **social profiles (optional)**: You need to mention the id of your social profiles; supported social profiles will be GitHub, StackOverflow, LinkedIn, Medium, Twitter.
     Note: For StackOverflow, you need to add your id, which is in **number**, for eg: `https://stackoverflow.com/users/5688477/modi-mohammed` for this URL id will be `5688477`.

   This is an example of the author info

   ```
   id: Jon Doe
   bio: A short intro about me
   GitHub:
   StackOverflow:
   LinkedIn:
   Medium:
   Twitter:
   ```

8. While creating a pull request, ensure that you enable `Allow edits from maintainers` permission.
9. We strongly **Discourage Plagiarism** and hence check all the blog pull requests for plagiarism using a plagiarism checker. Please make sure your content is not copy-pasted from anywhere else.

## Some tips that you can keep in mind while writing the blog.


- Your language shall be the [standard form](https://www.lexico.com/grammar/standard-english) of [U.S. English](https://www.lexico.com/grammar/british-and-spelling). *But feel free to use developer slang, emojis, GIFs, and quirkiness. Just don’t overdo it, eh?*

- Use [plain language](https://www.plainlanguage.gov/about/definitions/). It helps our readers around the world easily understand and gain value from what you write.

- Make sure the language in your writing is precise and doesn’t have mistakes.

- Use short paragraphs, break down longer paragraphs into smaller ones, people lose their interest while reading a long paragraph.

- Use headers to structure your post, use large headers for the main heading, and smaller for sub-sections in it.

- Try to use complete words then abbreviations, spell out an acronym that isn’t well-known.

- If your blog post contains a code snippet, don't forget to syntax highlighting it. You can also specify the programming language for which you want syntax highlighting.
  **For example:** in Markdown, typing ```js will give you JavaScript syntax highlighting.

- If your blog contains demo code, or if you want to include demo code in a repo for easier reference, please [add your demo code in this repo](https://github.com/LoginRadius/engineering-blog-samples) by raising a pull request.

- Use images/screenshots in your post to example things better.

- Always provide a GitHub demo link whenever your blog post contains the code.

- Ensure simplicity, ease of implementation of the content, developer-friendliness, and effectiveness.

- When in doubt, feel free to communicate your queries with us.
