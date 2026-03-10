import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";

actor {
  // Types
  type MembershipRequest = {
    id : Nat;
    fullName : Text;
    phone : Text;
    email : Text;
    plan : MembershipPlan;
  };

  type MembershipPlan = {
    #Regular;
    #Premium;
  };

  type ContactMessage = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
  };

  // Storage
  var memberCount = 0;
  var nextRequestId = 0;
  var nextMessageId = 0;

  let membershipRequests = Map.empty<Nat, MembershipRequest>();
  let contactMessages = Map.empty<Nat, ContactMessage>();

  // Membership Counter
  public shared ({ caller }) func getMemberCount() : async Nat {
    memberCount;
  };

  public shared ({ caller }) func incrementMemberCount() : async () {
    memberCount += 1;
  };

  // Membership Submissions
  public shared ({ caller }) func submitMembership(fullName : Text, phone : Text, email : Text, plan : MembershipPlan) : async Nat {
    if (fullName == "" or phone == "" or email == "") {
      Runtime.trap("All fields are required");
    };

    let request : MembershipRequest = {
      id = nextRequestId;
      fullName;
      phone;
      email;
      plan;
    };

    membershipRequests.add(nextRequestId, request);
    nextRequestId += 1;
    request.id;
  };

  public query ({ caller }) func getAllMembershipSubmissions() : async [MembershipRequest] {
    membershipRequests.values().toArray();
  };

  public query ({ caller }) func getMembershipSubmissionCount() : async Nat {
    membershipRequests.size();
  };

  // Contact Form Submissions
  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, message : Text) : async Nat {
    if (name == "" or email == "" or message == "") {
      Runtime.trap("All fields are required");
    };

    let contact : ContactMessage = {
      id = nextMessageId;
      name;
      email;
      message;
    };

    contactMessages.add(nextMessageId, contact);
    nextMessageId += 1;
    contact.id;
  };

  public query ({ caller }) func getAllContactMessages() : async [ContactMessage] {
    contactMessages.values().toArray();
  };
};
