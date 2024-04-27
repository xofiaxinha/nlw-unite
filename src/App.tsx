import { AttendeeList } from "./components/attendee-list"
import { Header } from "./components/header"

export function App() {
  return (
    <div className="flex flex-col max-w-6xl mx-auto py-5 gap-5">
      <Header />
      <AttendeeList />
    </div>
  )
}
