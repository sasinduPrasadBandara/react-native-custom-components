import React, { useState, useRef, useEffect } from "react";
import { View, FlatList, Animated, Dimensions, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, {
  Defs,
  ClipPath,
  Path,
  Image as SvgImage,
  LinearGradient,
  Stop,
  Rect,
} from "react-native-svg";

const HexagonCarousel = () => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const flatListRef = useRef(null);

  const data = [
    {
      id: 1,
      title: "Graphic Design Basics",
      subtitle: "Alice Smith",
      learners: "15,452.00",
      courses: "8,500+",
      image:
        "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3JhZmljJTIwZGVzaWdufGVufDB8fDB8fHww",
    },
    {
      id: 2,
      title: "Advanced Photography Techniques",
      subtitle: "John Doe",
      learners: "22,345.75",
      courses: "5,200+",
      image:
        "https://images.unsplash.com/photo-1470074558764-4e577e98bc85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fHBob3RvZ3JhcGh5fGVufDB8fDB8fHww",
    },
    {
      id: 3,
      title: "Full-Stack JavaScript Development",
      subtitle: "Emily Davis",
      learners: "40,123.40",
      courses: "18,600+",
      image:
        "https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amF2YXNjcmlwdHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 4,
      title: "Creative Writing Workshop",
      subtitle: "Sarah Johnson",
      learners: "9,654.90",
      courses: "2,000+",
      image:
        "https://images.unsplash.com/photo-1462642109801-4ac2971a3a51?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdyaXRpbmd8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 5,
      title: "Introduction to Data Visualization",
      subtitle: "Mark Wilson",
      learners: "29,850.25",
      courses: "12,000+",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRhdGElMjB2aXN1YWxpemF0aW9ufGVufDB8fDB8fHww",
    },
    {
      id: 6,
      title: "Mobile Game Development",
      subtitle: "David Brown",
      learners: "35,800.10",
      courses: "6,000+",
      image:
        "https://plus.unsplash.com/premium_photo-1682140932416-8b011dfa9b4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2FtZSUyMGRldmVsb3BtZW50fGVufDB8fDB8fHww",
    },
    {
      id: 7,
      title: "Ethical Hacking and Cybersecurity",
      subtitle: "Lisa Green",
      learners: "12,345.60",
      courses: "9,000+",
      image:
        "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhhY2tlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 8,
      title: "User Experience Research",
      subtitle: "Robert Black",
      learners: "18,768.55",
      courses: "3,500+",
      image:
        "https://plus.unsplash.com/premium_photo-1661589354357-f56ddf86a0b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXh8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 9,
      title: "Blockchain Development Bootcamp",
      subtitle: "Karen White",
      learners: "27,440.90",
      courses: "4,800+",
      image:
        "https://plus.unsplash.com/premium_photo-1681400678259-255b10890b08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmxvY2tjaGFpbnN8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 10,
      title: "AI and Machine Learning Fundamentals",
      subtitle: "James Hall",
      learners: "23,100.55",
      courses: "15,000+",
      image:
        "https://plus.unsplash.com/premium_photo-1682464708085-95b4486e2c32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFpfGVufDB8fDB8fHww",
    },
  ];

  const { width } = Dimensions.get("window");

  const imageSize = 300;

  // animated values for scaling
  const scaleValues = useRef(data.map(() => new Animated.Value(0.7))).current;

  useEffect(() => {
    // Update scale values based on focused index
    scaleValues.forEach((scaleValue, index) => {
      Animated.timing(scaleValue, {
        toValue: focusedIndex === index ? 1.1 : 0.7,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [focusedIndex]);

  //function witch call when card changes
  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setFocusedIndex(index);
    }
  };

  //custome rectangle view
  const CustomeShapeBox = () => {
    const LearnersBlock = () => {
      return (
        <View
          style={{
            width: "50%",
            height: "100%",
            borderRadius: 24,
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Text
            style={{
              color: "#A4ADA5",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Learners
          </Text>
          <Text
            style={{
              color: "#4B5D4B",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {data[focusedIndex].learners}
          </Text>
        </View>
      );
    };

    const CoursesBlock = () => {
      return (
        <View
          style={{
            width: "50%",
            height: "100%",
            borderRadius: 24,
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Text
            style={{
              color: "#A4ADA5",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Courses
          </Text>
          <Text
            style={{
              color: "#4B5D4B",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {data[focusedIndex].courses}
          </Text>
        </View>
      );
    };

    const MaskRectangle = () => {
      return (
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: "white",
            alignSelf: "center",
            marginTop: 50,
            borderRadius: 24,
            transform: [{ rotate: `45deg` }],
            position: "absolute",
            top: -110,
          }}
        />
      );
    };

    const SvgArrow = () => {
      return (
        <View
          style={{
            position: "absolute",
            top: -5,
            left: "50%",
            transform: [{ translateX: -15 }],
          }}
        >
          <Svg
            width="28"
            height="17"
            viewBox="0 0 28 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M16.1617 15.7535C14.9815 16.98 13.0185 16.98 11.8383 15.7535L1.56785 5.08013C-0.266115 3.17422 1.0846 -9.37141e-07 3.72958 -1.16837e-06L24.2704 -2.96411e-06C26.9154 -3.19534e-06 28.2661 3.17421 26.4322 5.08012L16.1617 15.7535Z"
              fill="#EDF5EE"
            />
          </Svg>
        </View>
      );
    };

    return (
      <View
        style={{
          width: "90%",
          height: 100,
          backgroundColor: "#E1FBE4",
          alignSelf: "center",
          marginTop: 20,
          borderRadius: 24,
          position: "relative",
        }}
      >
        <MaskRectangle />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <LearnersBlock />
          <CoursesBlock />
        </View>

        <SvgArrow />
      </View>
    );
  };

  const renderItem = ({ item,index }) => {
    return (
      <Animated.View
        key={item.id}
        style={[
          {
            width: imageSize,
            height: imageSize + 70,
            alignItems: "center",
            justifyContent: "center",
            transform: [{ scale: scaleValues[index] }],
          },
        ]}
      >
        <Svg width="100%" height="100%" viewBox="0 0 868 970">
          <Defs>
            <ClipPath id="customShapeClip">
              <Path
                d="M384 13.8675C414.94 -3.99577 453.06 -3.99577 484 13.8675L817.013 206.132C847.953 223.996 867.013 257.008 867.013 292.735V677.265C867.013 712.992 847.953 746.004 817.013 763.868L484 956.132C453.06 973.996 414.94 973.996 384 956.132L50.9873 763.868C20.0472 746.004 0.987305 712.992 0.987305 677.265V292.735C0.987305 257.008 20.0472 223.996 50.9873 206.132L384 13.8675Z"
                fill="none"
              />
            </ClipPath>
            <LinearGradient id="gradientOverlay" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="black" stopOpacity="0" />
              <Stop offset="1" stopColor="black" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <SvgImage
            href={{ uri: item.image }}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#customShapeClip)"
          />
          <Rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#gradientOverlay)"
            clipPath="url(#customShapeClip)"
          />
        </Svg>
        <View
          style={{
            position: "absolute",
            alignItems: "center",
            paddingTop: 180,
            width: "100%",
            gap: 8,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              fontWeight: "bold",
              color: "white",
              width: "65%",
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 14,
              color: "white",
              width: "30%",
            }}
          >
            {item.subtitle}
          </Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ paddingTop: 150, zIndex: 10, backgroundColor: "white" }}>
        <FlatList
          data={data}
          horizontal
          contentContainerStyle={{
            paddingStart: focusedIndex === 0 ? (width - imageSize) / 2 : 0,
            paddingEnd:
              focusedIndex === data.length - 1 ? (width - imageSize) / 2 : 0,
          }}
          renderItem={(item,index) => renderItem(item,index)}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          snapToInterval={imageSize}
          decelerationRate="fast"
          snapToAlignment="center"
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          ref={flatListRef}
        />
      </View>

      <CustomeShapeBox />
    </SafeAreaView>
  );
};

export default HexagonCarousel;
