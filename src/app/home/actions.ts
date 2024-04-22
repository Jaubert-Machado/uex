"use server";

import { sql } from "drizzle-orm";
import { db } from "../../database";
import { contacts, users } from "../../database/schema";
import { ContactData } from "../../types/contacts";
import { errorHandler } from "../../utils/error";
import { getSession, logout } from "../../utils/session";
import bcrypt from "bcrypt";

async function deleteAllContacts(id: string) {
  const contactList = await db
    .select()
    .from(contacts)
    .where(sql`userId = ${id}`);

  contactList.forEach(async (contact) => {
    await db.delete(contacts).where(sql`id = ${contact.id}`);
  });
}

export async function getContacts() {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("UNAUTHORIZED");
    }
    const data = (await db.select().from(contacts)).filter(
      (c) => c.userId === session.id
    );

    return {
      ok: true,
      data: data.map((contact) => ({
        id: contact.id,
        name: contact.name,
        cpf: contact.cpf,
        phone: contact.phone,
        address: contact.address,
        addressNumber: contact.addressNumber,
        state: contact.state,
        city: contact.city,
        addOnAddress: contact.addOnAddress,
        cep: contact.cep,
        district: contact.district,
        coordinates: JSON.parse(contact.coordinates),
      })),
    };
  } catch (error) {
    return errorHandler(error);
  }
}

export async function getContact(id: number) {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("UNAUTHORIZED");
    }

    const contact = (await db.select().from(contacts)).find(
      (contact) => contact.id === id && contact.userId === session.id
    );

    if (!contact) {
      throw new Error("Contact not found");
    }

    return {
      ok: true,
      data: {
        id: contact.id,
        name: contact.name,
        cpf: contact.cpf,
        phone: contact.phone,
        address: contact.address,
        addressNumber: contact.addressNumber,
        state: contact.state,
        city: contact.city,
        addOnAddress: contact.addOnAddress,
        cep: contact.cep,
        district: contact.district,
        coordinates: JSON.parse(contact.coordinates),
      },
    };
  } catch (error) {
    return errorHandler(error);
  }
}

export async function createContact(data: Omit<ContactData, "id">) {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("UNAUTHORIZED");
    }

    const contact = await (
      await db.select().from(contacts)
    ).find(
      (contact) => contact.cpf === data.cpf && contact.userId === session?.id
    );

    if (contact) {
      throw new Error("Contact already exists");
    }

    db.insert(contacts)
      .values({
        name: data.name,
        cpf: data.cpf,
        phone: data.phone,
        address: data.address,
        district: data.district,
        addressNumber: data.addressNumber,
        addOnAddress: data.addOnAddress,
        city: data.city,
        state: data.state,
        cep: data.cep,
        coordinates: JSON.stringify(data.coordinates),
        userId: session.id as number,
      })
      .catch((error) => {
        throw new Error(error);
      });

    return {
      ok: true,
      message: "Contact created",
    };
  } catch (error) {
    return errorHandler(error);
  }
}

export async function updateContact(
  contactId: string,
  data: Omit<ContactData, "id" | "coordinates">
) {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("UNAUTHORIZED");
    }

    db.update(contacts)
      .set({
        name: data.name,
        cpf: data.cpf,
        phone: data.phone,
        address: data.address,
        district: data.district,
        addressNumber: data.addressNumber,
        addOnAddress: data.addOnAddress,
        city: data.city,
        state: data.state,
        cep: data.cep,
      })
      .where(sql`id = ${contactId}`)
      .catch((error) => console.log(error));

    return {
      ok: true,
      message: "Contact updated",
    };
  } catch (error) {
    return errorHandler(error);
  }
}

export async function deleteContact(id: number) {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("UNAUTHORIZED");
    }

    const user = (await db.select().from(users)).find(
      (user) => user.id === session.id
    );

    if (!user) {
      throw new Error("User not found");
    }

    await db.delete(contacts).where(sql`id = ${id}`);

    return {
      ok: true,
      message: "Contact deleted",
    };
  } catch (error) {
    return errorHandler(error);
  }
}

export async function deleteAccount(password: string) {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("UNAUTHORIZED");
    }

    const user = await db
      .select()
      .from(users)
      .where(sql`id = ${session.id}`);

    const match = bcrypt.compareSync(password, user[0].password);

    if (!match) {
      throw new Error("Invalid password");
    }

    await deleteAllContacts(session.id as string);

    db.delete(users)
      .where(sql`id = ${session.id}`)
      .catch((err) => console.log(err));

    await logout();

    return {
      ok: true,
      message: "User deleted",
    };
  } catch (error) {
    return errorHandler(error);
  }
}
