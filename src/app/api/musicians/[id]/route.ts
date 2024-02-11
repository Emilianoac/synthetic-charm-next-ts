import { NextResponse } from "next/server";
import {collection, getDocs, query, where } from "firebase/firestore"
import db from "@/firebase/config";
import type { Musician } from "@/types/musician";

interface Params {
  params: {
    id: string;
  }
}

export async function GET(request : Request, {params} : Params): Promise<NextResponse<Musician> | NextResponse<object>> {
  try {
    const q = query(collection(db,"musicians"), where("slug", "==", params.id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      let data = { ...doc.data(), id: doc.id } as Musician;
      return NextResponse.json(data);
    } else {
      return new NextResponse("Not Found", { status: 404 });
    }
  }
  catch(err) {
    console.error(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  } 
}