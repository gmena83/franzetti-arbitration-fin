import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section>
        <h1>Welcome to Our Site</h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <p>Explore our services and offerings.</p>
        </motion.div>
      </section>

      {/* About Section */}
      <section>
        <h2>About Us</h2>
        <p>This is a place to tell your story and to say anything about your brand.</p>
        <blockquote>"This is a testimonial quote." - Client Name</blockquote>
      </section>

      {/* Professional Background */}
      <section>
        <h2>Professional Background</h2>
        <p>Information about professional experiences.</p>
      </section>

      {/* Academia Section */}
      <section>
        <h2>Academia</h2>
        <p>Details about academic history.</p>
      </section>

      {/* Education Section */}
      <section>
        <h2>Education</h2>
        <p>Information regarding educational qualifications.</p>
      </section>

      {/* Professional Associations */}
      <section>
        <h2>Professional Associations</h2>
        <p>List of professional organizations.</p>
      </section>

      {/* Bar Admissions */}
      <section>
        <h2>Bar Admissions</h2>
        <p>Details about bar admissions.</p>
      </section>

      {/* Languages Section */}
      <section>
        <h2>Languages</h2>
        <p>Languages spoken.</p>
      </section>
    </div>
  );
};

export default Home;