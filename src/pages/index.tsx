// Gatsby supports TypeScript natively!
import { navigate } from "gatsby"
const BlogIndex = () => {
if (typeof window !== `undefined`) {
    navigate("/async")
  }
  return null
}

export default BlogIndex
