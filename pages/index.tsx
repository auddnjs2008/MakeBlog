import { readdirSync, readFileSync } from 'fs'
import type { NextPage } from 'next'
import styled from 'styled-components'
import matter from "gray-matter";
import Link from 'next/link';


interface Post {
  categories: string[];
  title: string;
  date: string;
  tags: string[];
  description: string;
  slug: string;
}

const Home: NextPage<{ posts: Post[] }> = ({ posts }) => {

  return (
    <Container>
      {posts.map((post, index) =>
        <Post key={index}>
          <Link href={`${post.slug}`}>
            <a>
              <div className="tagWrapper">
                {post.categories.map(category => <div key={category} className="tags">{category}</div>)}
              </div>
              <div className="content">
                <h1>{post.title}</h1>
                <span>{post.date}</span>
              </div>
            </a>
          </Link>
        </Post>)}
    </Container>
  )
}



export async function getStaticProps() {

  const blogPosts = readdirSync("./_posts").map(file => {
    const content = readFileSync(`./_posts/${file}`, "utf-8");
    const [slug, _] = file.split(".");
    return { ...matter(content).data, slug };
  });

  return {
    props: {
      posts: blogPosts
    }
  };
}

const Container = styled.ul`
   width: 375px;
   margin: 0 auto;
   border: 1px solid black;
   height:100vh;
   overflow:auto;
   padding:10px;
`

const Post = styled.li`
    margin-bottom:5px;
    cursor: pointer;
    .tagWrapper{
      display:flex;
    }
    .tags{
      border-radius:5px;
      background-color:grey;
      padding:0.2rem;
      color:white;
    }
    .content{
      margin-top:5px;
      display:flex;
      justify-content:space-between;
    }

`

export default Home
