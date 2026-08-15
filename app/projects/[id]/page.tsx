
export default async function Home({params}:{params:Promise<{id:string}>}){
    const {id}= await params;
    return(

            <h1>Project {id} page</h1>
    )
}