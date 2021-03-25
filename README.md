# EconomicMobilityWebsite
This is the web interface for the economic mobility research project under Professor Kim

# Directory info

src
  -- server --> backend files
      -- api
          -- v1 --> current folder for REST endpoints
          -- helper.js --> some helper functions
          -- index.js --> registers endpoints
      -- models  --> folder for Mongoose data models

  -- client --> frontend React files
      -- main.js --> base react components
      -- components --> folder for all react subcomponents
config --> folder holding a file with some configuration variables


# Notes
I need to get you the Zillow pem file to ssh into the ec2. Remind me if you don't have this

# Commands

// file copy to the ec2 (no longer needed)
scp -i ~/Downloads/housing-key.pem ec2-user@ec2-18-189-215-44.us-east-2.compute.amazonaws.com:/home/ec2-user/homes.json

// ssh into ec2
ssh -i ~/Downloads/housing-key.pem ec2-user@ec2-18-189-215-44.us-east-2.compute.amazonaws.com


// [from the ec2 instance] go into the mongo shell
mongo --ssl --host zillow-docdb-cluster.cluster-cuusjgphml3x.us-east-2.docdb.amazonaws.com:27017 --sslCAFile rds-combined-ca-bundle.pem --username ZillowProjUser --password ZillowProjPass

// run the website (must run both the commands, in this order.. webpack updates the react components)
npx webpack
npm start
