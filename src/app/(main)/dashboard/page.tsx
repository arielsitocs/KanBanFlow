import DashboardWelcome from "../../../components/ui/DashboardWelcome"
import DashboardHeader from "../../../components/ui/DashboardHeader"
import Board from "../../../components/Board";
import BoardTypes from "../../../types/Board";

import verifyToken from "../../../utils/TokenVerify";

export const dynamic = 'force-dynamic';

// funcion que trae los tableros desde la api //
async function getBoards() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/boards/getall`, { cache: 'no-store' });

        if (!response.ok) return [];

        return await response.json();
    } catch (error) {
        console.error("Error al traer los tableros: ", error);
        return [];
    }
}

export default async function Dashboard() {
    const boards: BoardTypes[] = await getBoards();

    // extraemos los datos del usuario del token verificado para poder usarlos //
    const user = await verifyToken();

    return (
        <main className="p-10">
            <DashboardHeader />
            <div className="grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
                {
                    boards.length >= 1 ?
                        boards.map((board) => {
                            if (Number(board.userid) === Number(user.userid))
                                return (
                                    <Board
                                        key={board.boardid}
                                        boardid={board.boardid}
                                        title={board.title}
                                        userid={board.userid}
                                    />
                                )
                        })
                        : <DashboardWelcome />
                }
            </div>
        </main>
    )
}