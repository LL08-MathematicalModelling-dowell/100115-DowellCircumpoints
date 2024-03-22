import CanvasDimensionHelp from "../components/canvasDimensionHelp";
import DataTypeHelp from "../components/dataTypeHelp";
import ShapeTypeHelp from "../components/shapeTypeHelp";
import Description from "../components/description";

export const descriptions = {
  canvasDimension: {
    title: "Dimension of the Canvas",
    description: {
      length: "Length: Determines the length of your canvas",
      width: "Width: Determines the width of your canvas",
    },
  },
  shapeType: {
    title: "Type of shape",
    description: {
      general:
        "This option allows you to choose between squares and circles, determining the shape you want to fit inside the canvas.\nThis selection guides the calculations and visualizations provided by our app, ensuring that the results are tailored to the shape you've chosen.\nThis parameter determines the size of the shapes and affects their placement and spacing within the canvas. By adjusting this value, you can control the size and density of the squares/ circles within your layout.\n",
      square:
        "Length of the side of the squares that are to be inscribed in the canvas",
      circle: "Radius of the circles that are to be inscribed in the canvas",
    },
  },
  dataType: {
    title: "Type of data",
    description: {
      general:
        "This option lets you choose how you want the coordinates to be presented in the response.",
      cartesian:
        'If you select "Cartesian Coordinates," the coordinates will be calculated and displayed in the (x, y) format, like points on a graph',
      geocoordinate:
        'If you select "Geo Coordinates," the coordinates will be calculated and displayed in the (latitude, longitude) format, similar to how locations are represented on a map.',
    },
  },
};

export const helps = {
  canvasDimension: <CanvasDimensionHelp />,
  shapeType: <ShapeTypeHelp />,
  square: (
    <Description description={descriptions.shapeType.description.square} />
  ),
  radius: (
    <Description description={descriptions.shapeType.description.circle} />
  ),
  dataType: <DataTypeHelp />,
  gpsDeviceLocatorCenter: (
    <div className="descriptions-holder">
      The Centers of GPS Devices input consists of a list of (x, y) coordinate
      pairs that serve as the center points for each circle in the GPS Device
      Locator. These coordinates define the location around which the circles
      are drawn on the map.
    </div>
  ),
  gpsDeviceLocatorRadius: (
    <div className="descriptions-holder">
      This parameter specifies the radius value to be used while plotting the
      circles around the center coordinates Adjusting the radius allows you to
      control the size and reach of the circles, influencing the precision and
      scope of the spatial analysis.
    </div>
  ),
};
