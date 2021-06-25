import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import socket from "../../Socket";

interface Props {
  user: string;
}

interface Items {
  message: string;
  user: string;
}

const Chat = ({ user }: Props) => {
  const [listMessages, setListMessages] = useState<Items[]>([]);
  const [message, setMessage] = useState("");
  const [notify, setNotify] = useState("");
  const [hiddenNotify, setHiddenNotify] = useState(true);

  const scrollRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    socket.emit("connected", user);
  }, [user]);

  useEffect(() => {
    socket.on("messages", (msg) => {
      setListMessages([...listMessages, msg]);
    });

    socket.on("notify", (notify) => {
      setNotify(notify.message);
    });

    return () => {
      socket.off();
    };
  }, [listMessages, user]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  useEffect(() => {
    setTimeout(() => {
      setHiddenNotify(false);
    }, 10000);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("message", user, message);
    setMessage("");
  };

  return (
    <Wrapper>
      {notify && hiddenNotify && <Notify>{notify}</Notify>}
      <Container>
        {listMessages?.map((el, i) => {
          return (
            <ContainerList key={i}>
              <ListItem>{el.user}</ListItem>
              <ListItem style={{ marginLeft: 10 }}>{el.message}</ListItem>
            </ContainerList>
          );
        })}
        <Scroll ref={scrollRef} />
      </Container>
      <Form onSubmit={handleSubmit}>
        <Textarea
          placeholder="Escribir mensaje"
          value={message}
          onChange={handleChange}
        />
        <Button type="submit">Enviar</Button>
      </Form>
    </Wrapper>
  );
};

export default Chat;

const Wrapper = styled.div`
  margin: 0 auto;
  min-height: 50vh;
  max-height: 50vh;
  width: 600px;
  position: relative;
`;
const Textarea = styled.textarea`
  margin: 0.5em 0;
  padding: 1em 2em;
  border: 1px solid #ccc;
  border-radius: 1em;
  outline: none;
  letter-spacing: 0.1em;
  resize: none;
  height: 40px;
`;

const Form = styled.form`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
  margin: 0.5em;
  padding: 1em;
  background: #e40dc7;
  color: #fff;
  border: none;
  border-radius: 1em;
  letter-spacing: 0.1em;
  cursor: pointer;
`;

const ListItem = styled.div`
  color: white;
  padding: 0.1em 0.3em;
`;

const Container = styled.div`
  background: #333;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 50vh;
  max-height: 50vh;
  border-radius: 5px;
`;

const Scroll = styled.div``;

const ContainerList = styled.div``;

const Notify = styled.div`
  background: #e850db;
  color: white;
  padding: 1em;
  border-radius: 5px;
  width: 50%;
  position: absolute;
  top: -4em;
  right: 0;
`;
