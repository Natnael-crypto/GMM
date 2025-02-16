"use client";

import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useGetAvailableMatchesLeftQuery } from "@/lib/matchmaking/api";
import Loading from "@/components/ui/loading";
import { Link } from "@/lib/navigation";
import { useProfileCompletion } from "@/lib/hooks/profile-completion";

export default function NoMatchCard() {
  const user = useAppSelector((state) => state.auth.user);
  const { data: availableMatches, isLoading } = useGetAvailableMatchesLeftQuery(
    user?.id ?? "",
    { skip: !user }
  );

  const {
    worldlyLifestyle,
    islamicLifestyle,
    marriageDiscussion,
    familyIntroduction,
    basics,
  } = useProfileCompletion(user);

  const editProfileLink = (() => {
    if (basics < 100) {
      return `/dashboard/profile/${user?.id}/basic-information/edit`;
    }
    if (worldlyLifestyle < 100) {
      return `/dashboard/profile/${user?.id}/worldly-lifestyle/edit`;
    }
    if (islamicLifestyle < 100) {
      return `/dashboard/profile/${user?.id}/islamic-lifestyle/edit`;
    }
    if (marriageDiscussion < 100) {
      return `/dashboard/profile/${user?.id}/marriage/edit`;
    }
    if (familyIntroduction < 100) {
      return `/dashboard/profile/${user?.id}/family/edit`;
    }
    return `/dashboard/profile/${user?.id}/basic-information/edit`;
  })();

  return (
    <div className="gap-5 overflow-hidden text-md space-y-4 text-muted-foreground h-full flex flex-col md:flex-row items-center">
      <div className="w-full h-full bg-[#e8f3db] rounded-se-3xl rounded-es-3xl py-5 p-8 flex flex-col items-center justify-center gap-4">
        <div className="w-24">
          {user?.gender === "Male" ? (
            <Image
              className="w-full"
              src={"/assets/woman-hijab.svg"}
              width={221}
              height={234}
              alt="Woman in hihab"
            />
          ) : (
            <FontAwesomeIcon
              icon={faUser}
              className="w-full h-full aspect-square text-primary text-9xl"
            />
          )}
        </div>
        <h1 className="text-bold font-bold text-xl">No Match Found!</h1>
        <p className="text-center">
          You can get better matches by completing all sections of your profile
          by clicking
          <Link
            href={editProfileLink}
            className="cta bg-primary text-primary-foreground hover:by-secondary px-4 py-2 text-xs rounded-full block mt-3 m-auto"
          >
            EDIT PROFILE
          </Link>
          .
        </p>
      </div>
      <div className="w-full font-bold gmm-available-matches h-full bg-muted rounded-se-3xl rounded-es-3xl p-8 justify-center text-center m-auto flex flex-col">
        <p>You have</p>

        <h1 className="text-3xl bg-primary text-primary-foreground rounded-full">
          {availableMatches ?? <Loading />}
        </h1>

        <p>Available Matches Left</p>
        <div className="gmm-buy mt-5 flex flex-col gap-2">
          <p>You can purchase more matches by clicking link below:</p>
          <Link
            href="/checkout"
            className="cta bg-primary text-primary-foreground hover:by-secondary px-4 py-2 text-xs rounded-full m-auto"
          >
            Purchase Now
          </Link>
        </div>
      </div>
    </div>
  );
}
