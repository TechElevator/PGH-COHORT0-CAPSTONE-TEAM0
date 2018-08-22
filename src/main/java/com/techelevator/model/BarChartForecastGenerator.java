package com.techelevator.model;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.GradientPaint;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartPanel;
import org.jfree.chart.ChartUtilities;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.axis.CategoryAxis;
import org.jfree.chart.axis.CategoryLabelPositions;
import org.jfree.chart.axis.NumberAxis;
import org.jfree.chart.plot.CategoryPlot;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.chart.renderer.category.BarRenderer;
import org.jfree.data.category.CategoryDataset;
import org.jfree.data.category.DefaultCategoryDataset;
import org.jfree.ui.ApplicationFrame;
import org.jfree.ui.RefineryUtilities;


import java.util.ArrayList;

import javax.swing.JFrame;

	
	public class BarChartForecastGenerator extends JFrame {

		//private DailyForecast dailyForecast;
		
		
		public BarChartForecastGenerator(final String title, DailyForecast dailyForecast) {

			super(title);
			final CategoryDataset dataset = createDataset(dailyForecast);
			final JFreeChart chart = createChart(dataset);
			final ChartPanel chartPanel = new ChartPanel(chart);
			chartPanel.setPreferredSize(new Dimension(900, 270));
			setContentPane(chartPanel);
			try {
				OutputStream out = new FileOutputStream("/PGH-COHORT0-CAPSTONE-TEAM0/etc/testChart.png");
				ChartUtilities.writeChartAsPNG(out, chart, 800, 450);
				System.out.println("tried to save chart");
			} catch (IOException e) {
				System.out.println("couldn't save image!");
				e.printStackTrace();
			}

		}

		private CategoryDataset createDataset(DailyForecast dailyForecast) {
			ArrayList<Integer> highTemps = dailyForecast.getHighs();
			ArrayList<String> forecastDays = dailyForecast.getForecastDay();
			
			System.out.println("IN CREATEDATASET ---------------------------");
			System.out.println("Hightemps length: " + highTemps.size());
			System.out.println("ForecastDays length: " + forecastDays.size());
			System.out.println("------");
			
			
			final String series1 = "First";
			final String series2 = "Second";
			final String series3 = "Third";

			final String category1 = forecastDays.get(0);
			final String category2 = forecastDays.get(1);
			final String category3 = forecastDays.get(2);
			final String category4 = forecastDays.get(3);
			final String category5 = forecastDays.get(4);
			final String category6 = forecastDays.get(5);
			final String category7 = forecastDays.get(6);

			final DefaultCategoryDataset dataset = new DefaultCategoryDataset();

			
			
			dataset.addValue(highTemps.get(0), series1, category1);
			dataset.addValue(highTemps.get(1), series1, category2);
			dataset.addValue(highTemps.get(2), series1, category3);
			dataset.addValue(highTemps.get(3), series1, category4);
			dataset.addValue(highTemps.get(4), series1, category5);
			dataset.addValue(highTemps.get(5), series1, category6);
			dataset.addValue(highTemps.get(6), series1, category7);

			return dataset;

		}

		private JFreeChart createChart(final CategoryDataset dataset) {

			final JFreeChart chart = ChartFactory.createBarChart("Test Bar Chart: Daily Forecast", // chart
																					// title
					"Day", // domain axis label
					"Temperature (Fahrenheit)", // range axis label
					dataset, // data
					PlotOrientation.VERTICAL, // orientation
					false, // do or do not include legend
					true, // tooltips?
					false // URLs?
			);

			chart.setBackgroundPaint(Color.white);

			final CategoryPlot plot = chart.getCategoryPlot();
			plot.setBackgroundPaint(Color.lightGray);
			plot.setDomainGridlinePaint(Color.white);
			plot.setRangeGridlinePaint(Color.white);

			final NumberAxis rangeAxis = (NumberAxis) plot.getRangeAxis();
			rangeAxis.setStandardTickUnits(NumberAxis.createIntegerTickUnits());

			final BarRenderer renderer = (BarRenderer) plot.getRenderer();
			renderer.setDrawBarOutline(false);

			final GradientPaint gp0 = new GradientPaint(0.0f, 0.0f, Color.blue, 0.0f, 0.0f, Color.lightGray);
			final GradientPaint gp1 = new GradientPaint(0.0f, 0.0f, Color.green, 0.0f, 0.0f, Color.lightGray);
			final GradientPaint gp2 = new GradientPaint(0.0f, 0.0f, Color.red, 0.0f, 0.0f, Color.lightGray);
			renderer.setSeriesPaint(0, gp0);
			renderer.setSeriesPaint(1, gp1);
			renderer.setSeriesPaint(2, gp2);

			final CategoryAxis domainAxis = plot.getDomainAxis();
			domainAxis.setCategoryLabelPositions(CategoryLabelPositions.createUpRotationLabelPositions(Math.PI / 6.0));

			return chart;
		}

		public void generateForecastBarChart(BarChartForecastGenerator barChartGenerator) {

			//final BarChartForecastGenerator barChart = new BarChartForecastGenerator("Demo Chart: Daily Forecast", dailyForecast);
			barChartGenerator.pack();
			RefineryUtilities.centerFrameOnScreen(barChartGenerator);
			barChartGenerator.setVisible(true);
		}
		
	}




	
	
