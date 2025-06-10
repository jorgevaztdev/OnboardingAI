
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Library, Search, Filter, ExternalLink, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Mock data
const allContentItems = [
  { id: '1', title: 'Introduction to Company Culture', type: 'video', category: 'Onboarding', duration: '15 min', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'company team' },
  { id: '2', title: 'Product Deep Dive: LearnBoost', type: 'document', category: 'Product Training', duration: '45 pages', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'product screenshot' },
  { id: '3', title: 'Effective Communication Skills', type: 'course', category: 'Soft Skills', duration: '3 hours', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'communication people' },
  { id: '4', title: 'Cybersecurity Best Practices', type: 'interactive_module', category: 'Compliance', duration: '45 min', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'security lock' },
  { id: '5', title: 'Advanced Sales Techniques', type: 'webinar', category: 'Sales', duration: '1.5 hours', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'sales chart' },
  { id: '6', title: 'Using the CRM System', type: 'guide', category: 'Tools', duration: '30 min read', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'software interface' },
];

const categories = ['All', 'Onboarding', 'Product Training', 'Soft Skills', 'Compliance', 'Sales', 'Tools'];
const types = ['All', 'video', 'document', 'course', 'interactive_module', 'webinar', 'guide'];

export default function EmployeeLibraryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const filteredItems = allContentItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All' || item.category === selectedCategory) &&
    (selectedType === 'All' || item.type === selectedType)
  );

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-4xl font-headline font-semibold text-foreground flex items-center gap-2">
          <Library className="h-10 w-10 text-primary" /> Content Library
        </h1>
        <p className="text-lg text-muted-foreground">Browse and access all available training materials.</p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2"><Filter className="h-5 w-5" /> Filter & Search</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {types.map(type => <SelectItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}</SelectItem>)}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <Card key={item.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-0">
                <Image 
                  src={item.imageUrl} 
                  alt={item.title} 
                  width={600} 
                  height={400} 
                  className="w-full h-48 object-cover"
                  data-ai-hint={item.dataAiHint} 
                />
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
              <CardFooter className="p-6 border-t">
                <Button asChild className="w-full">
                  {/* In a real app, this link would go to the actual content viewer */}
                  <Link href={`/employee/library/view/${item.id}`} passHref>
                    <BookOpen className="mr-2 h-4 w-4" /> View Content
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
