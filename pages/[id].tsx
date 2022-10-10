import { readdirSync } from 'fs';
import matter from 'gray-matter';
import { GetStaticProps, NextPage } from 'next';
import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse/lib';
import styled from 'styled-components';
import { unified } from 'unified';

const Post: NextPage<{ post: string }> = ({ post }) => {
    return <Container dangerouslySetInnerHTML={{ __html: post }} />;
}


export function getStaticPaths() {
    const files = readdirSync("./_posts").map(file => {
        const [name, extension] = file.split(".");
        return { params: { id: name } }
    });

    return {
        paths: files,
        fallback: false
    }

}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { data, content } = matter.read(`./_posts/${ctx.params?.id}.md`);
    const { value } = await unified().use(remarkParse).use(remarkHtml).process(content);

    return {
        props: {
            post: value
        },
    }
}


const Container = styled.div`
    padding: 50px 100px;
    h1{
      text-align:center;
      font-size:x-large;
      font-weight:bold;
      color:skyblue;
      margin-bottom:20px; 
    }
    ul{
        margin-top:20px;
        list-style:disc;
        padding-left:30px;
    }

`




export default Post;