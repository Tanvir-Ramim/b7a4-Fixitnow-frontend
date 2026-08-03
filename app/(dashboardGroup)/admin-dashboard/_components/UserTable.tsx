import UserStatusButton from "./UserStatusButton";
import { getAllUsers } from "../_actions/userActions";
import { IUser } from "../_type/cateogoryTypes";

const UserTable = async () => {
  const users = await getAllUsers();

  return (
    <div className="w-full min-h-[54vh] mt-2 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm customescroll">
      <table className="w-full min-w-225 border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((user: IUser) => (
              <tr
                key={user.id}
                className="border-t border-gray-200 transition hover:bg-gray-50"
              >
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      user.activeStatus === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.activeStatus}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center">
                    <UserStatusButton
                      role={user.role}
                      userId={user.id}
                      activeStatus={user.activeStatus}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-10 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
