import {
  useEffect,
  useState
} from "react";

import toast from "react-hot-toast";

import {
  getMyProfile,
  getUserProfile,
  updateProfile
} from "../api/user.api";

import useAuthStore from "../store/auth.store";

export default function ProfileDialog({
  userId = null,
  isOpen,
  onClose
}) {

  const setUser =
    useAuthStore(
      state => state.setUser
    );

  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [editMode, setEditMode] =
    useState(false);

  const [avatarError, setAvatarError] =
    useState(false);

  const [form, setForm] =
    useState({

      name: "",

      description: "",

      avatar: ""

    });





  useEffect(() => {

    if (!isOpen)
      return;

    const loadProfile =
      async () => {

        try {

          setLoading(true);

          let res;

          if (userId) {

            res =
              await getUserProfile(
                userId
              );

          }

          else {

            res =
              await getMyProfile();

          }

          const data =
            res.data.data ||
            res.data;

          setProfile(
            data
          );

          setForm({

            name:
              data.name || "",

            description:
              data.description || "",

            avatar:
              data.avatar || ""

          });

          setAvatarError(false);

        }

        catch (error) {

          console.log(
            "Profile loading error",
            error
          );

        }

        finally {

          setLoading(false);

        }

      };

    loadProfile();

  }, [
    isOpen,
    userId
  ]);





  const handleChange =
    (e) => {

      setForm(prev => ({

        ...prev,

        [e.target.name]:
          e.target.value

      }));

    };





  const handleSave =
    async () => {

      if (!form.name.trim()) {

        toast.error(
          "Name is required"
        );

        return;

      }

      try {

        setSaving(true);

        const res =
          await updateProfile({

            name:
              form.name,

            description:
              form.description,

            avatar:
              form.avatar

          });

        const updated =
          res.data.data;

        setProfile(
          updated
        );

        setForm({

          name:
            updated.name || "",

          description:
            updated.description || "",

          avatar:
            updated.avatar || ""

        });

        setUser(
          updated
        );

        setEditMode(
          false
        );

        toast.success(
          "Profile updated"
        );

      }

      catch (err) {

        toast.error(

          err.response?.data?.message ||

          "Profile update failed"

        );

      }

      finally {

        setSaving(false);

      }

    };





  if (!isOpen)
    return null;





  return (

    <div
      className="
      fixed
      inset-0
      bg-black/70
      backdrop-blur-sm
      flex
      items-center
      justify-center
      z-50
      "
    >

      <div
        className="
        w-[90%]
        max-w-md
        bg-gray-900
        border
        border-white/10
        rounded-2xl
        p-6
        text-white
        "
      >

        <div
          className="
          flex
          justify-between
          items-center
          mb-6
          "
        >

          <h2
            className="
            text-xl
            font-bold
            "
          >

            {
              editMode
                ?
                "Edit Profile"
                :
                "Profile"
            }

          </h2>

          <button

            onClick={() => {

              setEditMode(false);

              onClose();

            }}

            className="
            text-gray-400
            hover:text-white
            text-xl
            "

          >

            ✕

          </button>

        </div>





        {

          loading

            ?

            <div
              className="
              text-center
              text-gray-400
              "
            >

              Loading...

            </div>

            :

            profile &&

            <>

              <div
                className="
                flex
                justify-center
                mb-6
                "
              >

                {

                  (
                    editMode
                      ?
                      form.avatar
                      :
                      profile.avatar
                  )

                  &&

                  !avatarError

                    ?

                    <img

                      src={
                        editMode
                          ?
                          form.avatar
                          :
                          profile.avatar
                      }

                      onError={() =>
                        setAvatarError(
                          true
                        )
                      }

                      className="
                      w-24
                      h-24
                      rounded-full
                      object-cover
                      border
                      border-white/10
                      "

                    />

                    :

                    <div
                      className="
                      w-24
                      h-24
                      rounded-full
                      bg-gradient-to-br
                      from-blue-500
                      to-purple-600
                      flex
                      items-center
                      justify-center
                      text-4xl
                      font-bold
                      "
                    >

                      {
                        (
                          editMode
                            ?
                            form.name
                            :
                            profile.name
                        )

                        ?.charAt(0)
                        ?.toUpperCase()

                        ||

                        "U"
                      }

                    </div>

                }

              </div>





              {

                editMode

                  ?

                  <div
                    className="
                    space-y-4
                    "
                  >

                    <div>

                      <label
                        className="
                        text-sm
                        text-gray-400
                        "
                      >

                        Avatar URL

                      </label>

                      <input

                        name="avatar"

                        value={
                          form.avatar
                        }

                        onChange={(e) => {

                          setAvatarError(
                            false
                          );

                          handleChange(e);

                        }}

                        placeholder="https://..."

                        className="
                        w-full
                        mt-1
                        p-2
                        rounded
                        bg-gray-800
                        "

                      />

                    </div>





                    <div>

                      <label
                        className="
                        text-sm
                        text-gray-400
                        "
                      >

                        Name

                      </label>

                      <input

                        name="name"

                        value={
                          form.name
                        }

                        onChange={
                          handleChange
                        }

                        className="
                        w-full
                        mt-1
                        p-2
                        rounded
                        bg-gray-800
                        "

                      />

                    </div>





                    <div>

                      <label
                        className="
                        text-sm
                        text-gray-400
                        "
                      >

                        About

                      </label>

                      <textarea

                        rows={4}

                        name="description"

                        value={
                          form.description
                        }

                        onChange={
                          handleChange
                        }

                        className="
                        w-full
                        mt-1
                        p-2
                        rounded
                        bg-gray-800
                        resize-none
                        "

                      />

                    </div>





                    <div
                      className="
                      flex
                      gap-3
                      pt-2
                      "
                    >

                      <button

                        onClick={() => {

                          setEditMode(
                            false
                          );

                          setForm({

                            name:
                              profile.name || "",

                            description:
                              profile.description || "",

                            avatar:
                              profile.avatar || ""

                          });

                        }}

                        className="
                        flex-1
                        py-2
                        rounded-lg
                        bg-gray-700
                        "

                      >

                        Cancel

                      </button>





                      <button

                        disabled={
                          saving
                        }

                        onClick={
                          handleSave
                        }

                        className="
                        flex-1
                        py-2
                        rounded-lg
                        bg-blue-600
                        hover:bg-blue-500
                        "

                      >

                        {
                          saving
                            ?
                            "Saving..."
                            :
                            "Save"
                        }

                      </button>

                    </div>

                  </div>

                  :

                  <div
                    className="
                    space-y-5
                    "
                  >

                    <div>

                      <p
                        className="
                        text-sm
                        text-gray-400
                        "
                      >

                        Name

                      </p>

                      <h3
                        className="
                        text-lg
                        font-semibold
                        "
                      >

                        {
                          profile.name
                        }

                      </h3>

                    </div>





                    <div>

                      <p
                        className="
                        text-sm
                        text-gray-400
                        "
                      >

                        Email

                      </p>

                      <p>

                        {
                          profile.email
                        }

                      </p>

                    </div>





                    <div>

                      <p
                        className="
                        text-sm
                        text-gray-400
                        "
                      >

                        About

                      </p>

                      <p>

                        {
                          profile.description ||

                          "No description"

                        }

                      </p>

                    </div>





                    {

                      !userId &&

                      <button

                        onClick={() =>
                          setEditMode(
                            true
                          )
                        }

                        className="
                        w-full
                        py-2
                        rounded-lg
                        bg-blue-600
                        hover:bg-blue-500
                        "

                      >

                        Edit Profile

                      </button>

                    }

                  </div>

              }

            </>

        }

      </div>

    </div>

  );

}