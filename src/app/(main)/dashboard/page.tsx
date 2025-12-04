import DashboardWelcome from "../../../components/ui/DashboardWelcome"
import DashboardHeader from "../../../components/ui/DashboardHeader"
import Board from "../../../components/Board";

import { boards } from "../../../data/boards.json";

export default function Dashboard() {

    return (
        <main className="p-10">
            <DashboardHeader />
            <div className="grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
                {
                    boards.length >= 1 ?
                        boards.map((board) => {
                            return (
                                <Board
                                    key={board.id}
                                    id={board.id}
                                    title={board.title}
                                    completedTasks={board.completedTasks}
                                    pendingTasks={board.pendingTasks}
                                    inProgressTasks={board.inProgressTasks}
                                />
                            )
                        })
                        : <DashboardWelcome />
                }
            </div>
        </main>
    )
}