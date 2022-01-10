import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { ISSUE_QUERY, GetIssues } from "./../getIssues";
import renderer from "react-test-renderer";
import TestRenderer from "react-test-renderer";

const mocks = [
  {
    request: {
      query: ISSUE_QUERY,
    },
    result: {
      data: {
        getIssues: [
          {
            id: "61db50f33cd9a04f3257730b",
            title: "title",
            description: "description",
            createdAt: "2022-01-09T21:17:39.364Z",
            postedBy: {
              username: "Kira Jones",
            },
            likes: [
              {
                likedBy: {
                  id: "61d91278f8000b733acd1320",
                },
              },
              {
                likedBy: {
                  id: "61db325e3186f0241d76c48e",
                },
              },
            ],
            dislikes: [],
            likeCount: 2,
            dislikeCount: 0,
            commentCount: 2,
          },
          {
            id: "61db5356a0d5480c4334efa2",
            title: "asd",
            description: "asd",
            createdAt: "2022-01-09T21:27:50.469Z",
            postedBy: {
              username: "Tristan Jones",
            },
            likes: [],
            dislikes: [],
            likeCount: 0,
            dislikeCount: 0,
            commentCount: 0,
          },
        ],
      },
    },
  },
];

it("should render without error", () => {
  renderer.create(
    <MockedProvider mocks={[]}>
      <GetIssues />
    </MockedProvider>
  );
});

it("should render loading state initially", () => {
  const component = renderer.create(
    <MockedProvider mocks={[]}>
      <GetIssues />
    </MockedProvider>
  );
  const tree = component.toJSON();
  expect(tree.children).toContain("Loading...");
});

// it("should render issues", async () => {
//   const issuesMock = [
//     {
//       request: {
//         query: ISSUE_QUERY,
//       },
//       result: {
//         data: {
//           getIssues: [
//             {
//               id: "61db50f33cd9a04f3257730b",
//               title: "title",
//               description: "description",
//               createdAt: "2022-01-09T21:17:39.364Z",
//               postedBy: {
//                 username: "Kira Jones",
//               },
//               likes: [
//                 {
//                   likedBy: {
//                     id: "61d91278f8000b733acd1320",
//                   },
//                 },
//                 {
//                   likedBy: {
//                     id: "61db325e3186f0241d76c48e",
//                   },
//                 },
//               ],
//               dislikes: [],
//               likeCount: 2,
//               dislikeCount: 0,
//               commentCount: 2,
//             },
//             {
//               id: "61db5356a0d5480c4334efa2",
//               title: "asd",
//               description: "asd",
//               createdAt: "2022-01-09T21:27:50.469Z",
//               postedBy: {
//                 username: "Tristan Jones",
//               },
//               likes: [],
//               dislikes: [],
//               likeCount: 0,
//               dislikeCount: 0,
//               commentCount: 0,
//             },
//           ],
//         },
//       },
//     },
//   ];

//   const component = renderer.create(
//     <MockedProvider mocks={[issuesMock]}>
//       <GetIssues />
//     </MockedProvider>
//   );
// });
