import { Container, NewMovie, ScrollY, Search } from "./styles";
import { CardFilm } from "../../components/cardFilm";
import { Button } from "../../components/button";
import { FiPlus } from "react-icons/fi";
import { Title } from "../../components/title";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import avatarPlaceholder from "../../assets/placeholder.jpg";
import { Input } from "../../components/input";
import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";

interface Note {
  id: number;
  title: string;
  description: string;
}

export function Films() {
  const { signOut, user } = useAuth();

  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceholder;

  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  function handleSignOut() {
    signOut();
    navigate("/");
  }
  function handleDetails(id) {
    navigate(`/preview/${id}`);
  }

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(`/notes?title=${search}`);
      setNotes(response.data);
      console.log(response.data);
    }
    fetchNotes();
  }, [search]);

  return (
    <Container>
      <Search>
        <button>Rocket Movies</button>

        <Input
          type="text"
          placeholder="Pesquisar pelo título"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div>
          <div>
            <p>{user.name}</p>
            <button onClick={handleSignOut}>Sair</button>
          </div>
          <img
            src={avatarUrl}
            alt={user.name}
            onClick={() => navigate("/profile")}
          />
        </div>
      </Search>

      <NewMovie>
        <Title title="Filmes" />
        <Button
          title="Novo filme"
          icon={FiPlus}
          onClick={() => navigate("/create")}
        />
      </NewMovie>
      <ScrollY>
        {notes.map((note) => (
          <CardFilm
            data={note.id}
            key={String(note.id)}
            title={note.title}
            description={note.description}
            onClick={() => handleDetails(note.id)}
          />
        ))}
      </ScrollY>
    </Container>
  );
}
