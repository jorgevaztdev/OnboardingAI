
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Library, Search, Filter, ExternalLink, BookOpen, PlusCircle, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

// Mock data - potentially richer for admin
const allContentItems = [
  { id: '1', title: 'Introduction to Company Culture', type: 'video', category: 'Onboarding', duration: '15 min', status: 'Published', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'teamwork office' },
  { id: '2', title: 'Product Deep Dive: LearnBoost', type: 'document', category: 'Product Training', duration: '45 pages', status: 'Draft', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'software product' },
  { id: '3', title: 'Effective Communication Skills', type: 'course', category: 'Soft Skills', duration: '3 hours', status: 'Published', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'people talking' },
  { id: '4', title: 'Cybersecurity Best Practices', type: 'interactive_module', category: 'Compliance', duration: '45 min', status: 'Archived', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'cyber security' },
];

const categories = ['All', 'Onboarding', 'Product Training', 'Soft Skills', 'Compliance', 'Sales', 'Tools'];
const types = ['All', 'video', 'document', 'course', 'interactive_module', 'webinar', 'guide'];
const statuses = ['All', 'Published', 'Draft', 'Archived'];

export default function AdminLibraryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredItems = allContentItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All' || item.category === selectedCategory) &&
    (selectedType === 'All' || item.type === selectedType) &&
    (selectedStatus === 'All' || item.status === selectedStatus)
  );

  return (
    <div className="space-y-8">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-4xl font-headline font-semibold text-foreground flex items-center gap-2">
            <Library className="h-10 w-10 text-primary" /> Content Library (Admin)
          </h1>
          <p className="text-lg text-muted-foreground">Manage, filter, and search all training materials.</p>
        </div>
         <Button asChild className="mt-4 md:mt-0">
            <Link href="/admin/content-management"><PlusCircle className="mr-2 h-4 w-4" /> Add New Content</Link>
        </Button>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2"><Filter className="h-5 w-5" /> Filter & Search</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
            <SelectContent>{categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
            <SelectContent>{types.map(type => <SelectItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
            <SelectContent>{statuses.map(stat => <SelectItem key={stat} value={stat}>{stat}</SelectItem>)}</SelectContent>
          </Select>
        </CardContent>
      </Card>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <Card key={item.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-0 relative">
                <Image 
                  src={item.imageUrl} 
                  alt={item.title} 
                  width={600} 
                  height={400} 
                  className="w-full h-48 object-cover"
                  data-ai-hint={item.dataAiHint}
                />
                <Badge className="absolute top-2 right-2" variant={item.status === 'Published' ? 'default' : item.status === 'Draft' ? 'secondary' : 'outline'}>
                  {item.status}
                </Badge>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="font-headline text-xl mb-2">{item.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground mb-1">
                  Category: <span className="font-medium text-primary">{item.category}</span>
                </CardDescription>
                <CardDescription className="text-sm text-muted-foreground mb-1">
                  Type: <span className="font-medium text-primary">{item.type.replace('_', ' ')}</span>
                </CardDescription>
                 <CardDescription className="text-sm text-muted-foreground">
                  Duration: <span className="font-medium text-primary">{item.duration}</span>
                </CardDescription>
              </CardContent>
              <CardFooter className="p-6 border-t flex items-center justify-between">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/content-management?edit=${item.id}`} passHref>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Link>
                </Button>
                <Button asChild size="sm">
                  {/* In a real app, this link would go to the actual content viewer or preview */}
                  <Link href={`/admin/library/preview/${item.id}`} passHref>
                    <BookOpen className="mr-2 h-4 w-4" /> Preview
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No Content Found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}
