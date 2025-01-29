Overview of Labor Market Project
This is a project I started developing locally on my machine in order to aid me in my job search and look up
global labor market statistics in the united states, including unemployment rates and CPI as well as any other
data that the BLS (Burea Of Labor Statistics) provides. Current functonality is that it will take a series id.
start year, and end year and provide data ranges in a table format converted from JSON, with the years and months listed
in descending order. Planned implemention is to format the data is chart format for easy and clear delivery and
improvement of the UI using Liferay or React, HTML, CSS

Biggest issue for current release to public is the limitations of 500 api calls per day for the key, one 
proposed solution is to pre-run, store, and serve the most popular queries.
