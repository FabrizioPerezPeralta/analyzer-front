import { useEffect, useState, useMemo } from "react";
import { getUsers, type User } from "@/services/userService";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Users as UsersIcon, Circle } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch users");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (a.isActive === b.isActive) return 0;
        return a.isActive ? -1 : 1;
      });
  }, [users, searchQuery]);

  const activeUsers = useMemo(() => users.filter((u) => u.isActive), [users]);

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <Skeleton className="h-12 w-64" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-primary font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-[40px] font-semibold leading-tight flex items-center gap-3">
            <UsersIcon className="h-10 w-10 text-primary" />
            Users Management
          </h1>
          <p className="text-[17px] text-ink-muted-48">
            Manage and monitor system users. Total: {users.length}
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted-48" />
          <Input
            placeholder="Search by username..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {activeUsers.length > 0 && !searchQuery && (
        <section className="space-y-4">
          <h2 className="text-[21px] font-semibold tracking-[0.231px] flex items-center gap-2">
            <Circle className="h-3 w-3 fill-emerald-500 text-emerald-500 animate-pulse" />
            Active Now
          </h2>
          <div className="flex flex-wrap gap-3">
            {activeUsers.map((user) => (
              <Badge key={user.id} variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1">
                {user.username}
              </Badge>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-4">
        <h2 className="text-[21px] font-semibold tracking-[0.231px]">
          All Users
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="border-hairline p-5 flex flex-col justify-between hover:bg-parchment transition-colors">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="font-semibold text-[17px]">{user.username}</p>
                  <p className="text-[12px] text-ink-muted-48">
                    Joined: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {user.isActive ? (
                  <Badge className="bg-emerald-500 text-white border-none">Active</Badge>
                ) : (
                  <Badge variant="secondary" className="text-ink-muted-48">Offline</Badge>
                )}
              </div>
            </Card>
          ))}
          {filteredUsers.length === 0 && (
            <p className="col-span-full text-center py-10 text-ink-muted-48 bg-parchment rounded-lg border border-dashed border-hairline">
              No users found matching your search.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Users;
