'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { FileCog, PlusCircle, Search, Edit, Trash2, MoreHorizontal, Filter } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';

// Mock data
const contentItems = [
  { id: '1', title: 'Introduction to Company Culture', type: 'video', category: 'Onboarding', status: 'Published', lastUpdated: '2023-10-26' },
  { id: '2', title: 'Product Deep Dive: LearnBoost', type: 'document', category: 'Product Training', status: 'Draft', lastUpdated: '2023-11-05' },
  { id: '3', title: 'Effective Communication Skills', type: 'course', category: 'Soft Skills', status: 'Published', lastUpdated: '2023-09-15' },
  { id: '4', title: 'Cybersecurity Best Practices', type: 'interactive_module', category: 'Compliance', status: 'Archived', lastUpdated: '2023-08-01' },
];

type ContentItem = typeof contentItems[0];

export default function ContentManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);

  const filteredItems = contentItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: ContentItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };
  
  const handleDelete = (itemId: string) => {
    // Placeholder for delete logic
    alert(`Delete item ${itemId}? (Not implemented)`);
  };
  
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Form submitted:", data);
    // In real app: save data, update list
    setIsFormOpen(false);
    setEditingItem(null);
  };


  return (
    <div className="space-y-8">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-4xl font-headline font-semibold text-foreground flex items-center gap-2">
            <FileCog className="h-10 w-10 text-primary" /> Content Management
          </h1>
          <p className="text-lg text-muted-foreground">Oversee and manage all training materials.</p>
        </div>
        <Button onClick={handleAddNew} className="mt-4 md:mt-0">
          <PlusCircle className="mr-2 h-5 w-5" /> Add New Content
        </Button>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline flex items-center justify-between">
            All Content Items
            <div className="flex items-center gap-2">
               <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs"
                icon={<Search className="h-4 w-4 text-muted-foreground" />}
              />
              <Button variant="outline" size="icon"><Filter className="h-4 w-4"/></Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.type.replace('_', ' ')}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === 'Published' ? 'default' : item.status === 'Draft' ? 'secondary' : 'outline'}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(item)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(item.id)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    No content items found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle className="font-headline">{editingItem ? 'Edit Content Item' : 'Add New Content Item'}</DialogTitle>
            <DialogDescription>
              {editingItem ? 'Update the details of this content item.' : 'Fill in the details to create a new content item.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input id="title" name="title" defaultValue={editingItem?.title} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">Type</Label>
                 <select id="type" name="type" defaultValue={editingItem?.type} className="col-span-3 p-2 border rounded-md border-input bg-background">
                  <option value="video">Video</option>
                  <option value="document">Document</option>
                  <option value="course">Course</option>
                  <option value="interactive_module">Interactive Module</option>
                  <option value="webinar">Webinar</option>
                  <option value="guide">Guide</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Input id="category" name="category" defaultValue={editingItem?.category} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <select id="status" name="status" defaultValue={editingItem?.status} className="col-span-3 p-2 border rounded-md border-input bg-background">
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">Content/URL</Label>
                <Textarea id="content" name="content" placeholder="Enter content, URL, or description..." className="col-span-3" rows={3}/>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
              <Button type="submit">{editingItem ? 'Save Changes' : 'Create Content'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
