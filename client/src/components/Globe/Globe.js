import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4maps from "@amcharts/amcharts4/maps";
import worldHigh from '@amcharts/amcharts4-geodata/worldHigh'
import axios from 'axios'
import './Globe.css'

am4core.useTheme(am4themes_animated);

class Globe extends Component {
    componentDidMount() {

        am4core.useTheme(am4themes_animated);
        // create map instance
        const chart = am4core.create("chartdiv", am4maps.MapChart);
        // Set map definition
        chart.geodata = worldHigh
        // setting projection
        chart.projection = new am4maps.projections.Orthographic();
        // Create map polygon series
        // represents map areas
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.useGeodata = true;
        // configure appearance and behavior of its items by accessing templates
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.fill = chart.colors.getIndex(0).lighten(0.5);
        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = chart.colors.getIndex(0);
        polygonTemplate.fill = am4core.color("#363636");
        polygonTemplate.propertyFields.fill = 'color'

        let imageSeries = chart.series.push(new am4maps.MapImageSeries());
        let imageSeriesTemplate = imageSeries.mapImages.template;
        let circle = imageSeriesTemplate.createChild(am4core.Circle);
        circle.radius = 4;
        circle.strokeWidth = 2;
        circle.tooltipText = '{title}'
        circle.nonScaling = true;
        circle.interactions.hoverable = true
        circle.url = '{url}'
        imageSeriesTemplate.propertyFields.latitude = "latitude";
        imageSeriesTemplate.propertyFields.longitude = "longitude";
        circle.propertyFields.fill = 'fill'

        let grid = chart.series.push(new am4maps.GraticuleSeries());
        grid.toBack();
        // grid.mapLines.template.line.stroke = am4core.color("#e33");
        // grid.mapLines.template.line.strokeOpacity = 0.2;
        chart.panBehavior = "rotateLongLat";

        axios.get('/globeData').then(res => {
            if (res.status === 200) {
                imageSeries.data = (res.data).map(city => {
                    return { ...city, fill: am4core.color(city.popularity) }
                })
            }
        }).catch(err => alert(err))

        this.chart = chart;

    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        return (
            <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
        );
    }
}

export default Globe;