import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container } from "./styles";

const schema = yup.object().shape({
  username: yup.string().required(),
});

export function ListUsers() {
  const [followers, setFollowers] = useState([]);
  const [username, setUsername] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setUsername(data.username);
    setFollowers([]);
    setCurrentPage(0);
  };

  useEffect(() => {
    const perPage = 10;

    if (username) {
      const ENDPOINT = `https://api.github.com/users/${username}/followers`;
      const URL = `${ENDPOINT}?per_page=${perPage}&page=${currentPage}&order=DESC`;
      fetch(URL)
        .then((response) => response.json())
        .then((newFollowers) => {
          if (newFollowers.length > 0) {
            setFollowers((prevFollowers) => [
              ...prevFollowers,
              ...newFollowers,
            ]);
          }
        });
    }
  }, [currentPage, username]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setCurrentPage((currentValue) => currentValue + 1);
      }
    });
    intersectionObserver.observe(document.querySelector("#sentinela"));

    return () => intersectionObserver.disconnect();
  }, []);

  return (
    <Container>
      <h1>Github follower listing</h1>

      <form className="area-search" onSubmit={handleSubmit(onSubmit)}>
        <input
          name="username"
          {...register("username")}
          type="text"
          placeholder="Username"
        />

        <button disabled={!isValid} type="submit">
          Search
        </button>
      </form>

      <div className="listing-area">
        <ul>
          {followers.map((follower, index) => (
            <li key={index}>
              <div>
                <img
                  alt="followers"
                  src={`https://github.com/${follower.login}.png`}
                />
                <p>
                  <a
                    href={`https://github.com/${follower.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github.com/<strong>{follower.login}</strong>
                  </a>
                </p>
              </div>
            </li>
          ))}
          <div id="sentinela" />
        </ul>
      </div>

      {followers.length > 0 ? (
        <span>Current page: {currentPage + 1}</span>
      ) : (
        <span>User not found</span>
      )}
    </Container>
  );
}
