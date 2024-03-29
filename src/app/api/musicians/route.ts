import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import db from "@/firebase/config";
import type { Musician } from "@/types/musician";

export async function GET(): Promise<NextResponse<Musician[]> | NextResponse<object>> {
  try {
    const musicians: Musician[] = []
    const res = await getDocs(collection(db,"musicians"));
    if(res.docs.length) {
      res.docs.map(doc => {
        const docData =  { ...doc.data(), id: doc.id } as Musician;
        musicians.push(docData);
      })
      return NextResponse.json(musicians);
    } else {
      return new NextResponse("Not Found", { status: 404 });
    }
  }
  catch(err) {
    console.error(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  } 
}