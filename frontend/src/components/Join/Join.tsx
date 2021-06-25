import React, { useState } from "react";
import styled from "styled-components";
import Chat from "../Chat/Chat";

const Join = () => {
  const [user, setUser] = useState("");
  const [join, setJoin] = useState(false);

  const handlerJoin = (event: React.FormEvent) => {
    event.preventDefault();
    if (user) {
      setJoin(true);
    }
  };
  return (
    <Wrapper>
      {!join ? (
        <Container>
          <>
            <Title>Entrar</Title>
            <Form onSubmit={handlerJoin}>
              <Input
                placeholder="Usuario"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
              <Button type="submit">Ingresar</Button>
            </Form>
          </>
        </Container>
      ) : (
        <Chat user={user} />
      )}
    </Wrapper>
  );
};

export default Join;

const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 100%;
`;

const Title = styled.h1`
  text-align: center;
  letter-spacing: 0.1em;
  margin: 0;
  color: #fff;
`;

const Container = styled.div`
  margin-top: 1em;
  margin: 0 auto;
`;
const Input = styled.input`
  margin: 0.5em 0;
  padding: 1em 2em;
  border: 1px solid #ccc;
  border-radius: 1em;
  outline: none;
  letter-spacing: 0.1em;
`;

const Button = styled.button`
  margin: 0.5em 0;
  padding: 1em;
  background: #e40dc7;
  color: #fff;
  border: none;
  border-radius: 1em;
  letter-spacing: 0.1em;
  cursor: pointer;
`;

const Form = styled.form`
  display: grid;
  justify-content: center;
  margin: 0 auto;
`;
