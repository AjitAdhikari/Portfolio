import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => (
  <main className="min-h-screen flex items-center justify-center px-6 bg-background">
    <motion.div
      className="text-center space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-[120px] font-bold leading-none text-gradient">404</h1>
      <p className="text-xl text-muted-foreground">Page not found</p>
      <Button asChild size="lg">
        <Link to="/"><ArrowLeft className="mr-2 size-4" /> Go Home</Link>
      </Button>
    </motion.div>
  </main>
);

export default NotFound;
