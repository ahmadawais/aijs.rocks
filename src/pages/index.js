import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import EllipsisText from "react-ellipsis-text";

import { Tag } from "../globalStyles";

const PostsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;
const Post = styled.div`
  background: #232537;
  width: calc(50% - 16px);
  height: 440px;
  border-radius: 16px;
  margin-bottom: 32px;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;
const PostTitle = styled.h2`
  color: #fdcb25;
  height: 50px;
  padding: 16px;
`;
const Thumbnail = styled.div`
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
`;
const PostFooter = styled.div`
  padding: 16px;
`;
const Description = styled.div`
  height: 57px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  p {
    color: white;
    font-size: 12px;
    margin: 0;
    span {
      color: white;
    }
  }
`;
const TagsWrapper = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 8px 0 0 0;
`;
const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`;
const AuthorWrapper = styled.div`
  display: flex;
  align-items: center;
  h6 {
    color: #fdcb25;
    margin-left: 8px;
  }
  img {
    border-radius: 8px;
    height: 32px;
  }
`;
const Date = styled.h6`
  color: #49e1c2;
`;
export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
  console.log(posts);
  return (
    <PostsWrapper>
      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
        .map(({ node: post }) => {
          return (
            <Post key={post.id}>
              <Link to={post.frontmatter.path}>
                <PostTitle>{post.frontmatter.title}</PostTitle>
                <Thumbnail
                  style={{
                    backgroundImage: `url(${
                      post.frontmatter.thumbnail.childImageSharp.responsiveSizes
                        .src
                    })`
                  }}
                />
              </Link>
              <PostFooter>
                <Description>
                  <p>
                    {" "}
                    <EllipsisText
                      text={post.frontmatter.shortDescription}
                      length={150}
                    />
                  </p>
                </Description>
                <TagsWrapper>
                  {post.frontmatter.tags.slice(0, 3).map(tag => (
                    <Tag key={tag} style={{ marginRight: 8 }}>
                      {tag}
                    </Tag>
                  ))}
                </TagsWrapper>
                <Details>
                  <AuthorWrapper>
                    <img
                      src={post.frontmatter.authorAvatar}
                      alt={post.frontmatter.author}
                    />
                    <h6>{post.frontmatter.author}</h6>
                  </AuthorWrapper>
                  <Date>
                    <i className="icon-clock" />
                    {post.frontmatter.date}
                  </Date>
                </Details>
              </PostFooter>
            </Post>
          );
        })}
    </PostsWrapper>
  );
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { layout: { eq: "inspire" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            author
            thumbnail {
              childImageSharp {
                responsiveSizes(maxWidth: 400) {
                  src
                  srcSet
                  sizes
                }
              }
            }
            authorAvatar
            shortDescription
            tags
          }
        }
      }
    }
  }
`;
