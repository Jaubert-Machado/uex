"use client";

import React, { useEffect, useMemo } from "react";
import * as S from "./styles";

import Map from "@components/Map";
import ContactFilter from "@components/ContactFilter";
import { deleteContact, getContacts } from "./actions";
import Contact from "@components/Contact";
import { useRouter, useSearchParams } from "next/navigation";
import { ContactData } from "../../types/contacts";
import ContactModal from "./Modals/Contact";
import DeleteAccModal from "./Modals/DeleteAccount";

const Home = () => {
  const [contacts, setContacts] = React.useState<ContactData[]>([]);
  const [mapCenter, setMapCenter] = React.useState<{
    lat: number;
    lng: number;
  }>();
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
  const [search, setSearch] = React.useState<string>("");
  const [refresh, setRefresh] = React.useState(false);
  const param = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    async function get() {
      const res = await getContacts();

      if (res.ok) {
        setContacts(res.data);
      }
    }

    get();
  }, [param, refresh]);

  const filteredContacts = useMemo(() => {
    if (!contacts) return [];

    if (!search)
      return contacts.sort((a, b) =>
        sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );

    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().startsWith(search.toLowerCase()) ||
        contact.cpf.startsWith(search)
    );
  }, [search, contacts, sortOrder]);

  function deleteContactHandler(id: number) {
    return async () => {
      await deleteContact(id);
      setRefresh((prev) => !prev);
    };
  }

  function onFocusClick(coordinates: { lat: number; lng: number }) {
    return () => {
      setMapCenter(coordinates);
    };
  }

  function onEditClick(id: number) {
    return () => {
      router.push(`?modal=contact&id=${id}`);
    };
  }

  return (
    <S.Page>
      <S.LeftContainer>
        <S.HeaderContainer>
          <ContactFilter
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch("")}
            onSort={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
          />
          <S.HeaderButton onClick={() => router.push("?modal=contact")}>
            <S.AddContactIcon />
          </S.HeaderButton>
          <S.HeaderButton onClick={() => router.push("?modal=delete-acc")}>
            <S.DeleteAccIcon />
          </S.HeaderButton>
        </S.HeaderContainer>
        <S.ContactList>
          {contacts &&
            filteredContacts.map((contact) => {
              return (
                <Contact
                  key={contact.id}
                  data={contact}
                  onFocusClick={onFocusClick(contact.coordinates)}
                  onDeleteClick={deleteContactHandler(contact.id)}
                  onEditClick={onEditClick(contact.id)}
                />
              );
            })}
          {contacts.length === 0 && (
            <span
              style={{
                textAlign: "center",
              }}
            >
              Adicione um contato
            </span>
          )}
        </S.ContactList>
      </S.LeftContainer>
      <S.RightContainer>
        <Map center={mapCenter} />
      </S.RightContainer>
      <ContactModal />
      <DeleteAccModal />
    </S.Page>
  );
};

export default Home;
