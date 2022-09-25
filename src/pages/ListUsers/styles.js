import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-width: 320px;

  h1 {
    font-size: 1.2rem;
    padding-top: 1rem;
  }

  .area-search {
    display: flex;
    align-items: flex-start;
    width: 90%;
    margin: 1rem 0;

    input {
      height: 2rem;
      width: 70%;
      border: 0;
      border-radius: 0.25rem;
      padding: 0 1rem;
      margin-right: 0.6rem;
    }

    button {
      height: 2rem;
      width: 30%;
      border: 0;
      border-radius: 0.25rem;
      cursor: pointer;
    }
  }

  span {
    padding: 1rem 0;
  }

  h1,
  span {
    color: rgba(255, 255, 255, 0.7);
    padding-bottom: 1rem;
  }

  .listing-area {
    width: 90%;
    overflow-y: scroll;
    padding: 0;
    background-color: #ddd;
    border-radius: 0.25rem 0.25rem 0 0;
  }

  a {
    color: rgba(6, 33, 59, 0.7);

    &:hover {
      color: rgba(6, 33, 59, 0.9);
    }
  }

  li {
    padding: 15px;
  }
  li img {
    --size: 75px;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
  }
  li div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    background-color: #fff;
    height: calc(100% - 30px);
    border-radius: 0.25rem;
  }

  #sentinela {
    width: 100%;
    height: 5px;
    background: transparent;
  }

  @media (min-width: 720px) {
    .area-search {
      width: 40%;
    }

    .listing-area {
      width: 40%;
    }
  }
`;
