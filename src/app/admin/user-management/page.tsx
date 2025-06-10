
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Users as UsersIcon, PlusCircle, Search, Edit, Trash2, MoreHorizontal, UserCheck, UserX } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';

// Mock data
const users = [
  { id: '1', name: 'Alice Wonderland', email: 'alice@example.com', role: 'employee', status: 'Active', lastLogin: '2023-11-10', avatar: 'https://placehold.co/40x40.png?text=AW', dataAiHint: 'woman portrait' },
  { id: '2', name: 'Bob The Builder', email: 'bob@example.com', role: 'admin', status: 'Active', lastLogin: '2023-11-11', avatar: 'https://placehold.co/40x40.png?text=BB', dataAiHint: 'man portrait' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'employee', status: 'Inactive', lastLogin: '2023-09-01', avatar: 'https://placehold.co/40x40.png?text=CB', dataAiHint: 'person face' },
  { id: '4', name: 'Diana Prince', email: 'diana@example.com', role: 'employee', status: 'Pending', lastLogin: null, avatar: 'https://placehold.co/40x40.png?text=DP', dataAiHint: 'woman face' },
];

type User = typeof users[0];

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddNewUser = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    alert(`Delete user ${userId}? (Not implemented)`);
  };
  
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("User form submitted:", data);
    // In real app: save data, update list
    setIsFormOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="space-y-8">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-4xl font-headline font-semibold text-foreground flex items-center gap-2">
            <UsersIcon className="h-10 w-10 text-primary" /> User Management
          </h1>
          <p className="text-lg text-muted-foreground">Manage platform users and their roles.</p>
        </div>
        <Button onClick={handleAddNewUser} className="mt-4 md:mt-0">
          <PlusCircle className="mr-2 h-5 w-5" /> Add New User
        </Button>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline flex items-center justify-between">
            All Users
            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10" 
                />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} data-ai-hint={user.dataAiHint} />
                        <AvatarFallback>{user.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {user.name}
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'Active' ? 'default' : user.status === 'Inactive' ? 'secondary' : 'outline'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastLogin || 'N/A'}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit User
                        </DropdownMenuItem>
                         {user.status === 'Active' && (
                          <DropdownMenuItem className="text-orange-600 focus:text-orange-600 focus:bg-orange-50">
                            <UserX className="mr-2 h-4 w-4" /> Deactivate
                          </DropdownMenuItem>
                        )}
                        {user.status !== 'Active' && (
                          <DropdownMenuItem className="text-green-600 focus:text-green-600 focus:bg-green-50">
                            <UserCheck className="mr-2 h-4 w-4" /> Activate
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                 <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-headline">{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
            <DialogDescription>
              {editingUser ? 'Update user details.' : 'Fill in the form to add a new user.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" name="name" defaultValue={editingUser?.name} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" name="email" type="email" defaultValue={editingUser?.email} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">Role</Label>
                <select id="role" name="role" defaultValue={editingUser?.role || "employee"} className="col-span-3 p-2 border rounded-md border-input bg-background">
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
               {!editingUser && ( // Only show password for new users
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">Password</Label>
                  <Input id="password" name="password" type="password" placeholder="Set initial password" className="col-span-3" />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
              <Button type="submit">{editingUser ? 'Save Changes' : 'Create User'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
}
