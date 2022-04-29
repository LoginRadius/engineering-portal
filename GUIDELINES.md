## 1) Guidelines for Writing Your Blog Post

Here are the guidelines that you shall follow for writing a blog post for LoginRadius Blog:

1. You shall be familiar with Markdown. The second section clearly describes how to format your blog post and submit it. This section describes the guidelines for creating the actual blog post content.

1. If possible, discuss your blog post title and outline with us before drafting your blog post. You can do so in the [Discussions section](https://github.com/LoginRadius/engineering-portal/discussions) by creating a new discussion thread.

2. Your language shall be the [standard form](https://www.lexico.com/grammar/standard-english) of [U.S. English](https://www.lexico.com/grammar/british-and-spelling). *But feel free to use developer slang, emojis, GIFs, and quirkiness. Just don't overdo it, eh?*

3. Use [plain language](https://www.plainlanguage.gov/about/definitions/). It helps our readers around the world easily understand and gain value from what you write.

3. Use [contractions](https://www.lexico.com/grammar/contractions) consistently.

4. Make sure the language in your writing is precise and doesn't have mistakes.

5. Use short paragraphs. And break down longer paragraphs into smaller ones. Readers quickly lose interest while reading a long paragraph.

6. Use headers to structure your post. Start with using H2, H3, and so on.

7. Use complete words and then abbreviations. And spell out acronyms that aren't well-known.

8. If your blog post contains a code snippet, don't forget to syntax highlighting it. You can also specify the programming language for which you want syntax highlighting.
  **For example:** in Markdown, typing ```js will give you JavaScript syntax highlighting.

9. If your blog contains demo code, or if you want to include demo code in a repo for easier reference, then [add your demo code in this repo](https://github.com/LoginRadius/engineering-blog-samples) by raising a separate pull request.

10. Use images/screenshots in your blog post to explain things better. Any stock images you use shall be free for commercial use without requiring attribution.

11. Ensure simplicity, ease of implementation of the content, developer-friendliness, and effectiveness.

12. When in doubt, feel free to communicate your queries with us.

## 2) Guidelines for Submitting Your Blog Post

Here are the guidelines that you shall follow for formatting and submitting your blog post.

1. First of all, create a directory under `/content/engineering/guest-post/`. The name of the directory will be the slug of your blog post. Only use lowercase letters and separate words using hyphens. For example, `this-is-my-blog-post-title`

2. Add an `index.md` file and add your blog post content in it. Place any relevant images used in the blog in the same directory as `index.md`.

3. Do not add images using web URLs. Always add image files in the same directory as your `index.md` and refer to them in `index.md` using either Markdown or HTML tags. 

3. Always add alternate text that clearly describes those images in your blog post.

3. Format your blog post in Markdown — it's easy, fast, and multi-platform. And you can edit it in any editor, like VS Code, which has `HTML` preview. You can also use online tools like [Dillinger](https://dillinger.io/), where you find the sample content to understand the syntax of Markdown.

4. You can also refer to this [Markdown Guide](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
5. The blog shall have a cover image with size **1200px x 800px**.

6. The blog shall have the following meta tags at the top of your `.md` file, as explained below.

   - **title:** A meaningful title. Max. 60 characters.
     Note: This title will appear in the post, so no need to again include it in the `.md` file.
   - **date:** A date shall be in `YYYY-MM-DD` format. And the date shall not be greater than the current date.
   - **coverImage:** The name of the image with format shall come here. For example, `coverimage.png`. Make sure that the image is present in the same directory as your `index.md`.
   - **author:** The name of the author. Make sure that it matches what you would add in the `/content/author.yaml` file.
   - **tags:** Add up to 3 relevant tags as an array of string `for eg: ["NodeJs"]`.
   - **description:** Add a short description about your blog post, which will appear in the card of your blog. It shall not be more than 160 characters.

   This is an example of the meta info in your blog:

   ```
   ---
   title: "Hello, this is a title"
   date: "2020-06-11"
   coverImage: "coverImage.png"
   author: "Jon Doe"
   tags: ["Example1", "Example2", "Example3"]
   description: "This is a blog about so and so on. Read this to learn this and this"
   ---

   Your blog will start here...

   ```

7. You shall add the **author details** in `/content/author.yaml`. The format shall be as follows:

   - **id (required)**: The name of the author. It shall be the same as the name in the meta tags of the blog.
   - **bio (required)**: A short, meaningful intro about you that instills trust and confidence. This ideally shall be 240 characters in length.
   - **social profiles (optional)**: You need to mention the id of your social profiles; supported social profiles are GitHub, StackOverflow, LinkedIn, Medium, and Twitter.
     Note: For StackOverflow, you need to add your id, which is in **number**, for eg: `https://stackoverflow.com/users/5688477/modi-mohammed` for this URL id will be `5688477`.

   This is an example of the author details:

   ```
   id: Jon Doe
   bio: A short intro about me
   github:
   stackoverflow:
   linkedin:
   medium:
   twitter:
   ```

8. While creating a pull request, ensure that you enable `Allow edits from maintainers` permission.

9. We strongly **Discourage Plagiarism** and check all the blog pull requests for plagiarism. Make sure your content is not a copy-paste job.

## 3) Review Process

Your blog post will undergo three review phases:

**Phase 1:** Your pull request is checked against our guidelines.

**Phase 2:** We'll check your content thoroughly and edit it for improvements. We'll also request changes from you if necessary. We may further request you to add or remove sections based on your blog post content.

**Phase 3:** We'll check your content once again, verify any sample code included, and request a final set of changes if any.

After completing the three phases, we'll merge your pull request and subsequently publish it on our publication:  https://www.loginradius.com/blog/engineering

Note that we may reject your pull request if it doesn't meet our guidelines or quality standards.
