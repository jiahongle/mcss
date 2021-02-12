/***
 * Helper functions for actions related to announcements 
 * */

// Helper function for posting the announcement: check with front end team
export const postAnnouncement = async (postAnnounceComp, app) => {

    const request = new Request("/announcements/post", {
        method: "post",
        body: JSON.stringify(postAnnounceComp.state),
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    try {
        const response = await fetch(request);

        // if (response.status == 200) {
        //     // continue;
        //     // depends on front end implementation

        // }

    } catch (error) {
        console.log(error)
    }

};