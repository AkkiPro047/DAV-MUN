import { resources } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="space-y-4 text-center mb-12">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Delegate Resource Library
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          A repository of essential documents, guides, and links to help you prepare for conferences.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
        {resources.map((category) => (
          <Card key={category.category}>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{category.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.items.map((item, index) => (
                  <div key={item.id}>
                    <Link
                      href={item.link}
                      target={item.link.startsWith('http') ? '_blank' : '_self'}
                      rel={item.link.startsWith('http') ? 'noopener noreferrer' : ''}
                      className="group flex items-start space-x-4 rounded-md p-2 -m-2 transition-colors hover:bg-accent"
                    >
                      <div className="mt-1">
                        <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-accent-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground group-hover:text-accent-foreground">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                    {index < category.items.length - 1 && <Separator className="my-2" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
