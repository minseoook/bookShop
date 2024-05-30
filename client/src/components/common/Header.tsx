import { styled } from "styled-components";
import logo from "../../assets/images/logo.png";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Category } from "../../models/category.model";
import { fetchCategory } from "../../api/category.api";
import { useCategory } from "../../hooks/useCategory";

const Header = () => {
  const category = useCategory();
  console.log(category);
  return (
    <HeaderStyle>
      <h1 className="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </h1>
      <nav className="category">
        <ul>
          {category.map((item) => (
            <li key={item.category_id}>
              <Link
                to={
                  item.category_id === null
                    ? "/books"
                    : `/books?categoryId=${item.category_id}`
                }
              >
                {item.category_name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="auth">
        <ul>
          <li>
            <Link to="/login">
              <FaSignInAlt />
              로그인
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <FaSignOutAlt />
              회원가입
            </Link>
          </li>
        </ul>
      </nav>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.header`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.background};

  .logo {
    img {
      width: 200px;
    }
  }

  .category {
    /* .menu-button {
      display: none;
    } */

    ul {
      display: flex;
      gap: 32px;
      li {
        a {
          font-size: 1.5rem;
          font-weight: 600;
          text-decoration: none;
          color: ${({ theme }) => theme.color.text};
          &:hover {
            color: ${({ theme }) => theme.color.primary};
          }
        }
      }
    }
    .auth {
      display: flex;
      ul {
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 120px;
        li {
          a,
          button {
            font-size: 1rem;
            font-weight: 600;
            text-decoration: none;
            display: flex;
            align-items: center;
            line-height: 1;
            background: none;
            border: 0;
            cursor: pointer;
            justify-content: center;
            width: 100%;

            svg {
              margin-right: 6px;
            }
          }
        }
      }
    }
  }
`;
export default Header;
