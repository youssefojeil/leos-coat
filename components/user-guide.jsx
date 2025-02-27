import { ArrowRight, Database, MessageSquare, Search, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function UserGuide() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Text-to-SQL AI Assistant
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Query your database using natural language and get instant results
        </p>
      </header>

      <Tabs defaultValue="getting-started" className="mb-8">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="data-schema">Data Schema</TabsTrigger>
          <TabsTrigger value="examples">Example Queries</TabsTrigger>
          <TabsTrigger value="tips">Tips & Tricks</TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started" className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Welcome to Your SQL Assistant
            </h2>
            <p className="mb-4">
              Our Text-to-SQL AI Assistant helps you query your database using
              plain English. No SQL knowledge required!
            </p>

            <div className="grid md:grid-cols-3 gap-4 my-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-500" />
                    Ask Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Type your question in natural language, just like you'd ask
                    a colleague.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-green-500" />
                    Get SQL
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our AI generates the appropriate SQL query based on your
                    question.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-amber-500" />
                    See Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    View your results in a table or chart format with
                    explanations in plain English.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg border mb-6">
              <h3 className="text-lg font-medium mb-2">How to Use</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>
                  Type your question in the search bar (e.g., "Show me the top 5
                  customers by revenue")
                </li>
                <li>Click the search button or press Enter</li>
                <li>Review the generated SQL query and results</li>
                <li>
                  Refine your question if needed for more specific results
                </li>
              </ol>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="data-schema" className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Available Data Schema
            </h2>
            <p className="mb-6">
              Below is the database schema you can query. Understanding the
              available tables and their relationships will help you formulate
              more effective questions.
            </p>

            <div className="overflow-auto text-black">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Table Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Key Columns</TableHead>
                    <TableHead className="w-[150px]">Relationships</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">customers</TableCell>
                    <TableCell>Customer information and details</TableCell>
                    <TableCell>
                      <span className="block">
                        <Badge variant="outline" className="mr-1">
                          id
                        </Badge>{' '}
                        Customer ID
                      </span>
                      <span className="block">
                        <Badge variant="outline" className="mr-1">
                          name
                        </Badge>{' '}
                        Full name
                      </span>
                      <span className="block">
                        <Badge variant="outline" className="mr-1">
                          email
                        </Badge>{' '}
                        Email address
                      </span>
                      <span className="block">
                        <Badge variant="outline" className="mr-1">
                          created_at
                        </Badge>{' '}
                        Join date
                      </span>
                    </TableCell>
                    <TableCell>Has many orders</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">orders</TableCell>
                    <TableCell>Order transactions and status</TableCell>
                    <TableCell>
                      <span className="block">
                        <Badge variant="outline" className="mr-1">
                          id
                        </Badge>{' '}
                        Order ID
                      </span>
                      <span className="block">
                        <Badge variant="outline" className="mr-1">
                          customer_id
                        </Badge>{' '}
                        Customer reference
                      </span>
                      <span className="block">
                        <Badge variant="outline" className="mr-1">
                          amount
                        </Badge>{' '}
                        Total amount
                      </span>
                      <span className="block">
                        <Badge variant="outline" className="mr-1">
                          status
                        </Badge>{' '}
                        Order status
                      </span>
                      <span className="block">
                        <Badge variant="outline" className="mr-1">
                          created_at
                        </Badge>{' '}
                        Order date
                      </span>
                    </TableCell>
                    <TableCell>Belongs to customer, has many items</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">products</TableCell>
                    <TableCell>Product catalog and inventory</TableCell>
                    <TableCell>
                      <span className="block">
                        <Badge variant="outline" className="mr-1">
                          id
                        </Badge>{' '}
                        Product ID
                      </span>
                      <span className="block">
                        <Badge variant="outline" className="mr-1">
                          name
                        </Badge>{' '}
                        Product name
                      </span>
                      <span className="block">
                        <Badge variant="outline" className="mr-1">
                          price
                        </Badge>{' '}
                        Unit price
                      </span>
                      <span className="block">
                        <Badge variant="outline" className="mr-1">
                          category
                        </Badge>{' '}
                        Product category
                      </span>
                      <span className="block">
                        <Badge variant="outline" className="mr-1">
                          inventory
                        </Badge>{' '}
                        Stock count
                      </span>
                    </TableCell>
                    <TableCell>Has many order items</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">order_items</TableCell>
                    <TableCell>Items within each order</TableCell>
                    <TableCell>
                      <span className="block">
                        <Badge variant="outline" className="mr-1">
                          id
                        </Badge>{' '}
                        Item ID
                      </span>
                      <span className="block">
                        <Badge variant="outline" className="mr-1">
                          order_id
                        </Badge>{' '}
                        Order reference
                      </span>
                      <span className="block">
                        <Badge variant="outline" className="mr-1">
                          product_id
                        </Badge>{' '}
                        Product reference
                      </span>
                      <span className="block">
                        <Badge variant="outline" className="mr-1">
                          quantity
                        </Badge>{' '}
                        Quantity ordered
                      </span>
                      <span className="block">
                        <Badge variant="outline" className="mr-1">
                          price
                        </Badge>{' '}
                        Price at time of order
                      </span>
                    </TableCell>
                    <TableCell>Belongs to order and product</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Example Queries</h2>
            <p className="mb-6">
              Here are some example questions you can ask to get started. Click
              on any example to try it out.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:bg-slate-50 transition-colors">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Customer Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="bg-slate-100 p-3 rounded-md text-sm">
                      <p>Who are our top 5 customers by total order value?</p>
                    </div>
                    <div className="bg-slate-100 p-3 rounded-md text-sm">
                      <p>
                        How many new customers did we get each month in 2023?
                      </p>
                    </div>
                    <div className="bg-slate-100 p-3 rounded-md text-sm">
                      <p>What's the average order value per customer?</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:bg-slate-50 transition-colors">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Product Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="bg-slate-100 p-3 rounded-md text-sm">
                      <p>Which products have the highest sales volume?</p>
                    </div>
                    <div className="bg-slate-100 p-3 rounded-md text-sm">
                      <p>
                        Show me products with low inventory (less than 10 units)
                      </p>
                    </div>
                    <div className="bg-slate-100 p-3 rounded-md text-sm">
                      <p>
                        What's our best-selling product category by revenue?
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:bg-slate-50 transition-colors">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Order Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="bg-slate-100 p-3 rounded-md text-sm">
                      <p>What's our monthly order volume for the past year?</p>
                    </div>
                    <div className="bg-slate-100 p-3 rounded-md text-sm">
                      <p>Show me orders with more than 5 items</p>
                    </div>
                    <div className="bg-slate-100 p-3 rounded-md text-sm">
                      <p>
                        What percentage of orders have the status "completed"?
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:bg-slate-50 transition-colors">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Complex Queries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="bg-slate-100 p-3 rounded-md text-sm">
                      <p>
                        Compare sales by category between Q1 and Q2 this year
                      </p>
                    </div>
                    <div className="bg-slate-100 p-3 rounded-md text-sm">
                      <p>
                        Which customers haven't placed an order in the last 3
                        months?
                      </p>
                    </div>
                    <div className="bg-slate-100 p-3 rounded-md text-sm">
                      <p>
                        What's the average time between a customer's first and
                        second order?
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Tips for Better Results
            </h2>
            <p className="mb-6">
              Follow these tips to get the most accurate and useful results from
              your queries.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <Search className="h-5 w-5 text-blue-500" />
                  Be Specific
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  The more specific your question, the more accurate the results
                  will be.
                </p>
                <div className="space-y-2">
                  <div className="bg-red-50 text-red-800 p-3 rounded-md text-sm">
                    <p className="font-medium">Instead of:</p>
                    <p>"Show me sales"</p>
                  </div>
                  <div className="bg-green-50 text-green-800 p-3 rounded-md text-sm">
                    <p className="font-medium">Try:</p>
                    <p>"Show me total sales by product category for Q1 2023"</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <Database className="h-5 w-5 text-green-500" />
                  Use Table Names
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Including table names in your question can help the AI
                  understand your intent better.
                </p>
                <div className="space-y-2">
                  <div className="bg-red-50 text-red-800 p-3 rounded-md text-sm">
                    <p className="font-medium">Instead of:</p>
                    <p>"Who bought the most products?"</p>
                  </div>
                  <div className="bg-green-50 text-green-800 p-3 rounded-md text-sm">
                    <p className="font-medium">Try:</p>
                    <p>"Which customer has the highest number of orders?"</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-amber-500" />
                  Ask Follow-up Questions
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  You can refine your results by asking follow-up questions
                  based on previous queries.
                </p>
                <div className="space-y-2">
                  <div className="bg-slate-100 p-3 rounded-md text-sm">
                    <p className="font-medium">Initial question:</p>
                    <p>"Show me top-selling products this month"</p>
                  </div>
                  <div className="bg-slate-100 p-3 rounded-md text-sm">
                    <p className="font-medium">Follow-up:</p>
                    <p>"Now compare their sales to last month"</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-500" />
                  Specify Visualization
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  You can request specific chart types for better data
                  visualization.
                </p>
                <div className="space-y-2">
                  <div className="bg-slate-100 p-3 rounded-md text-sm">
                    <p>"Show monthly sales for 2023 as a line chart"</p>
                  </div>
                  <div className="bg-slate-100 p-3 rounded-md text-sm">
                    <p>
                      "Display product category distribution as a pie chart"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>

            <div className="bg-slate-50 p-6 rounded-lg border">
              <h3 className="text-lg font-medium mb-3">Common Issues</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">
                    No results or incorrect results
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Try rephrasing your question with more specific details
                    about what you're looking for. Make sure you're using column
                    names that exist in the database.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">Query times out</h4>
                  <p className="text-sm text-muted-foreground">
                    Your query might be too complex. Try breaking it down into
                    simpler questions or adding more filters to reduce the data
                    being processed.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">Unexpected data in results</h4>
                  <p className="text-sm text-muted-foreground">
                    Check if you need to add specific conditions to filter your
                    data, such as date ranges or status filters.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </TabsContent>
      </Tabs>

      <Separator className="my-8" />

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Start exploring your data with natural language queries and discover
          insights faster than ever.
        </p>
        <Button size="lg" className="gap-2">
          Try It Now <ArrowRight className="h-4 w-4" />
        </Button>
      </section>
    </div>
  );
}
